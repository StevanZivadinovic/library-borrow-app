"use client";
import { useEffect, useState } from "react";
import BookList from '@/components/BookList'
import { fetchBorrowedBooks } from "@/lib/actions/getBorrowedBooks";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import { fetchBorrowedBooksDetails } from "@/lib/actions/getBorrowedBooksDetails";



const MyProfilePage = () => {
    const [booksData, setBooksData]=useState<BookType[]>([]);
  const [bookDetails, setBookDetails] = useState<BookType[]>([]);
  
    useEffect(() => {
      fetchBorrowedBooks(setBooksData);
      console.log('Books data fetched:', booksData);
       }, []);

       useEffect(() => {
        booksData.length > 0 && booksData.forEach(async (book) => {
         try{
       const bookData= await  fetchBorrowedBooksDetails(setBookDetails, book);
          console.log("Book Details:", bookData);
         }catch(error){
          console.error("Error fetching book details:", error);
         }    
        })
       },[booksData])

    useEffect(() => {
        if (bookDetails.length > 0) {
          console.log("Book details updated:", bookDetails);
        }
    }, [bookDetails]);
  
       return (
    <div className='flex justify-between w-[80%] mx-auto'>
      <div className="profile_data flex-1">
        <h2 className='font-semibold text-[var(--basic-gray)] text-3xl'>Personal data</h2>
      </div>
      <div className="borrowed_books_data flex-1 p-2 bg-linear-to-b from-[var(--gradiend-dark-form-one)] to-[var(--basic-native)] rounded-lg">
        <h2 className='font-semibold text-[var(--basic-gray)] text-3xl'>Borrowed books</h2>
         <BookList
        title={"Popular Books"}
        books={bookDetails}
        containerClassName={'mt-28 sm:grid-cols-2!'} 
         bookWidth={'w-[70%]!'}
         bookBorrowedStyle={'justify-center items-center'}
         isMyProfile={true}
         />
       
  
      </div>

    </div>
  )
}

export default MyProfilePage