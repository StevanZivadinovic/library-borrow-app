import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { BookCover } from "./BookCover";

const BookOverview = ({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  summary,
  coverColor,
  coverUrl,
}:BookType) => {
  return (
    <section className="book-overview flex flex-col sm:flex-row!">
      <div className="flex flex-1 flex-col gap-5">
        <h1 className=" text-5xl">{title}</h1>

        <div className="book-info flex">
            <p className="mr-1">
                By <span className="font-semibold text-light-200 text-[var(--basic-cream)]">{author} </span>
            </p>
            <p className="mr-2">
            Category {" "}
                <span className="font-semibold text-light-200 text-[var(--basic-cream)]">{genre} </span>
            </p>
            <div className="flex flex-row gap-1">
                <Image alt="star" src={'./icons/star.svg'} width={20} height={20}/>
                <span className="font-semibold text-light-200 text-[var(--basic-cream)]">{rating}</span> /5
            </div>
        </div>
        <div className="book-copies flex gap-2">
            <p>
                Total Books: <span className="font-semibold text-light-200 text-[var(--basic-cream)]">{totalCopies}</span>
            </p>
            <p>
                Available Books: <span className="font-semibold text-light-200 text-[var(--basic-cream)]">{availableCopies}</span>
            </p>
        </div>
        <p className="book-description text-justify">{summary}</p>
        <Button className="book-overview-btn cursor-pointer bg-[var(--basic-cream)] mt-5 w-50" variant="secondary">
            <Image src={'./icons/book.svg'} alt="book" width={20} height={20}/>
            <p className="font-bebas text-sm font-bold uppercase">Borrow Book</p>
        </Button>
      </div>
      <div className="relative flex flex-1 justify-center ">
        <div className="relative">
            <BookCover
            variant='wide'
            className='z-10'
            coverColor={coverColor}
            coverImage={coverUrl}
            />
        </div>
         <div className="absolute left-[60%] top-10 rotate-12 opacity-60">
            <BookCover
            variant='wide'
            coverColor={coverColor}
            coverImage={coverUrl}
            />
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
