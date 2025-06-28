import AuthForm from "@/components/AuthForm";
import { signInSchema } from "@/lib/validations";
import React from "react";

const SignInPage = () => {
  return (
    <div>
      <div className="">
        <h1 className="text-3xl font-semibold">Create Your Library Account</h1>
        <p className="text-[18px] mt-2 text-[var(--basic-gray)] !font-thin">
          Please complete all fields and upload a valid university ID to gain
          access to the library
        </p>
      </div>
      <AuthForm
        type="sign-in"
        schema={signInSchema}
        defaultValues={{
          email: "",
          password: "",
          fullName: "",
          universityId: 0,
          universityCard: "",
        }}
        onSubmit={()=>{console.log("submit")}}
      />
    </div>
  );
};
export default SignInPage;
