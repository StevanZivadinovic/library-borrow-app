import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GoArrowLeft } from "react-icons/go";
import BookForm from "@/components/admin/forms/BookForm";

const Page = () => {
  return (
    <>
      <Button asChild className="back-btn w-[10%]">
        <Link href="/admin/books"><GoArrowLeft /> Go Back</Link>
      </Button>

      <section className="w-full max-w-2xl mt-10">
        <BookForm />
      </section>
    </>
  );
};
export default Page;