import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { Button } from './ui/button'

export const BookCard = (book:BookType) => {
  return (
 <div key={book?.id} className="book-card flex flex-col justify-between h-full">
  <Link href={`/boooks/${book.id}`} className="flex flex-col h-full">
   
    <div className="w-full h-[250px] overflow-hidden">
      <img
        src={book.cover}
        alt={book.title}
        className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
      />
    </div>

   
    <div className="mt-2">
      <h3 className="text-lg font-semibold">{book.title}</h3>
      <p className="text-gray-500 text-sm">{book.genre}</p>
    </div>
  </Link>

 
  {book?.isBorrowed && (
    <div className="mt-2">
      <div className="flex items-center gap-1 text-sm text-gray-700">
        <Image alt="calendar_icon" src="/icons/calendar.svg" width={16} height={16} />
        <p>11 days left to return</p>
      </div>
      <Button
        variant="secondary"
        className="cursor-pointer bg-[var(--basic-cream)] opacity-50 font-bebas w-full mt-2 text-[12px] font-bold uppercase"
      >
        Download receipt
      </Button>
    </div>
  )}
</div>

  )
}
