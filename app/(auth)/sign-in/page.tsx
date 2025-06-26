import AuthForm from '@/components/AuthForm';
import React from 'react'

 const SignInPage = () => {
  return (
    <div>
      <div className="">
      <h1 className="text-3xl font-semibold">Create Your Library Account</h1>
      <p className='text-[18px] mt-2 text-[var(--basic-gray)] !font-thin'>Please complete all fields and upload a valid university ID to gain
        access to the library
    </p>
      </div>
      <AuthForm/>
    </div>
  )
}
export default SignInPage;
