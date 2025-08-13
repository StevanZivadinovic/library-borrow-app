"use client";
import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Home = () => {
  const [booksData, setBooksData]=useState<BookType[]>([]);


  const fetchBooks = async () => {
       try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/get-books`);
      if (!res.ok) {
        throw new Error("Failed to fetch books");
      }
      const booksData = await res.json();
      setBooksData(booksData)
    } catch (error) {
      console.error("Error fetching books:", error);
      toast("Failed to load books. Please try again.");
    }
  };

  useEffect(() => {
    fetchBooks();
     }, []);

  return (
    <>
      <BookOverview {...booksData[1]} />
      <BookList
        showTitle={true}
        title={"Popular Books"}
        books={booksData}
        containerClassName={"mt-28"}
      />
    </>
  );
};

export default Home;
