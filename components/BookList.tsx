import Link from "next/link";
import React from "react";
import { BookCard } from "./BookCard";

const BookList = ({ title, books, containerClassName }: bookListType) => {
  return (
    <section className="w-full">
      <h2 className="font-bebas text-4xl text-light-100 mt-20 text-left">
        {title}
      </h2>
     <div className="bookList px-4">
  <div
    className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 ${containerClassName}`}
  >
    {books.map((book) => (
      <BookCard key={book?.id} {...book} />
    ))}
  </div>
</div>


    </section>
  );
};

export default BookList;
