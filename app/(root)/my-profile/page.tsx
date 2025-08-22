"use client";
import { useEffect, useState } from "react";
import BookList from '@/components/BookList'
import { fetchBorrowedBooks } from "@/lib/actions/getBorrowedBooks";
import { fetchBorrowedBooksDetails } from "@/lib/actions/getBorrowedBooksDetails";
import { InferSelectModel } from "drizzle-orm";
import { borrowRecords } from "@/database/schema";



const MyProfilePage = () => {
    const [booksBorrowData, setBorrowBooksData]=useState<InferSelectModel<typeof borrowRecords>[]>([]);
  const [bookDetails, setBookDetails] = useState<BookType[]>([]);
  
    useEffect(() => {
      fetchBorrowedBooks(setBorrowBooksData);
       }, []);

       useEffect(() => {
  if (booksBorrowData.length > 0) {
    const fetchDetails = async () => {
      try {
        const details = await Promise.all(
          booksBorrowData.map((book) => fetchBorrowedBooksDetails(book))
        );
        setBookDetails(details); 
        console.log("All book details fetched:", details);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchDetails();
  }
}, [booksBorrowData]);

   
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