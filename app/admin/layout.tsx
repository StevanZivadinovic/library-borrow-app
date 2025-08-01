import React, { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import Sidebar from "@/components/admin/Sidebar";
import  Header  from "@/components/admin/Header";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
console.log("Session in admin layout:", session);
  if (!session?.user?.id) redirect("/log-in");

//   const isAdmin = await db
//     .select({ isAdmin: users.role })
//     .from(users)
//     .where(eq(users.id, session.user.id))
//     .limit(1)
//     .then((res) => res[0]?.isAdmin === "ADMIN");

//   if (!isAdmin) redirect("/");

  return (
    <main className="flex min-h-screen w-full flex-row">
      <Sidebar session={session} />

      <div className="flex w-full flex-col bg-[var(--basic-admin-gray)] p-5">
        <Header session={session}/>
        {children}
      </div>
    </main>
  );
};
export default Layout;