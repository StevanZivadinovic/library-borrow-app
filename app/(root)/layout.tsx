"use client";

import { Header } from "@/components/Header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; 
import React, { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/log-in");
    }
  }, [status, router]);

  if (status === "loading") return null; 

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
