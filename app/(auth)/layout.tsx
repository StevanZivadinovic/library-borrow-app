import Image from 'next/image'
import React, { ReactNode } from 'react'

const Layout = ({children}: {children: ReactNode}) => {
  return (
    <main className="auth-container flex">
<section className='auth-form max-w-[50%] p-[40px] mt-[10vh] mx-[5vw] bg-gradient-to-b
 from-[var(--gradiend-dark-form-one)] to-[var(--gradiend-dark-form-two)] rounded-lg '>
<div className="auth-box w-[90%] p-5">
  <div className="flex flex-row gap-3">
    <Image src={'icons/logo.svg'} alt='logo' width={37} height={37}></Image>
    <h1 className='text-2xl font-semibold text-white'>BookWise</h1>
  </div>
      <div className='mt-5'>{children}</div>
</div>
</section>
<section className='auth-illustration w-[50%]'>
  <Image
  src={'/images/auth-illustration.png'}
  alt='auth-illustration'
  width={1000}
  height={1000}
  className='size-full object-cover'
  ></Image>
</section>
    </main>
  )
}

export default Layout