import Link from "next/link";
import React from "react";
import { BookCard } from "./BookCard";

const BookList = ({ title, books, containerClassName, showTitle,bookWidth,bookBorrowedStyle,isMyProfile }: bookListType) => {
  return (
    <section className="w-full">
     {showTitle && <h2 className="font-bebas text-4xl text-light-100 mt-20 text-left">
        {title}
      </h2>}
     <div className="bookList px-4">
  <div
    className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 ${containerClassName}`}
  >
    {books.map((book) => (
      <BookCard isMyProfile={isMyProfile} book={book} key={book?.id} {...book} bookWidth={bookWidth} bookBorrowedStyle={bookBorrowedStyle}/>
    ))}
  </div>
</div>


    </section>
  );
};

export default BookList;
