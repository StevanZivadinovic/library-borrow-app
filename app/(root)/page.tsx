"use client";
import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { fetchBooks } from "@/lib/actions/getBooks";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Home = () => {
  const [booksData, setBooksData]=useState<BookType[]>([]);


  useEffect(() => {
    fetchBooks(setBooksData);
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
