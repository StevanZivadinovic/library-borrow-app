"use client";

import { Header } from "@/components/Header";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; 
import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { status,data } = useSession();
  const updateActivity = async () => {
  await fetch("/api/update-activity", {
    method: "POST",
  });
};
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/log-in");
    }
    updateActivity()
  }, [status, router]);

  if (status === "loading") return (<div className="flex justify-center items-center h-screen w-full">
    <ClipLoader
        color={'white'}
        loading={true}
        className="flex justify-center items-center h-screen w-full"
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  </div> )

 
  return (
    <>
      {status === "authenticated" && (
        <main className=":root">
          <div className="mx-auto max-w-7xl text-center">
            <Header />
            <div className="mt-20 pb-20">{children}</div>
          </div>
        </main>
      )}
    </>
  );
};

export default Layout;
