import React from "react";

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
      <div key={book.id} className="book-card">
        <img src={book.cover} alt={book.title} className="w-full h-auto" />
        <h3 className="text-xl font-semibold mt-2.5">{book.title}</h3>
        <p className="text-gray-500">{book.genre}</p>
      </div>
    ))}
  </div>
</div>


    </section>
  );
};

export default BookList;
