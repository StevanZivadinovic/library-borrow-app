"use client";
import AuthForm from '@/components/AuthForm';
import { logInSchema } from '@/lib/validations';
import React from 'react'

 const LoginPage = () => {
  return (
        <div>
      <div >
        <h1 className="text-3xl font-semibold">Create Your Library Account</h1>
        <p className="text-[18px] mt-2 text-[var(--basic-gray)] !font-thin">
          Please complete all fields and upload a valid university ID to gain
          access to the library
        </p>
      </div>
      <AuthForm
        type="log-in"
        schema={logInSchema}
        defaultValues={{
          email: "",
          password: "",
        }}
        onSubmit={(data)=>{console.log(data)}}
      />
    </div>
  )
}
export default LoginPage;
