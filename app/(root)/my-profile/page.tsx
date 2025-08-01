import BookList from '@/components/BookList'
import { sampleBooks } from '@/constants'
import React from 'react'

const MyProfilePage = () => {
  return (
    <div className='flex justify-between w-[80%] mx-auto'>
      <div className="profile_data flex-1">
        <h2 className='font-semibold text-[var(--basic-gray)] text-3xl'>Personal data</h2>
      </div>
      <div className="borrowed_books_data flex-1 p-2 bg-linear-to-b from-[var(--gradiend-dark-form-one)] to-[var(--basic-native)] rounded-lg">
        <h2 className='font-semibold text-[var(--basic-gray)] text-3xl'>Borrowed books</h2>
         <BookList
        title={"Popular Books"}
        books={sampleBooks}
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