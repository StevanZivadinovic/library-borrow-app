"use client";
import { cn, getInitials } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { signOut, useSession } from "next-auth/react";
export const Header = () => {
  const { data: user } = useSession();
   const pathname = usePathname();
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/" className="text-2xl font-bold flex text-white">
        <Image
          src={"./icons/logo.svg"}
          alt="logo"
          width={40}
          height={40}
        ></Image>
        BookWise
      </Link>
      <ul className="flex flex-row items-center gap-8 text-white">
        <li>
          <Link
            href={"/"}
            className={cn(
              "text-base cursor-pointer capitalize",
              pathname === "/" ? "text-light-200 font-bold" : "text-light-100"
            )}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href={"/search"}
            className={cn(
              "text-base cursor-pointer capitalize",
              pathname === "/search" ? "text-light-200" : "text-light-100"
            )}
          >
            Search
          </Link>
        </li>
        <li>
          <Popover>
            <PopoverTrigger>
              <Avatar>
                <AvatarImage />
                <AvatarFallback className="cursor-pointer text-xl text-[var(--gradiend-dark-form-one)] bg-[var(--basic-gray)]">
                  {getInitials(user?.user?.name as string) || "?"}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent
          
            className="w-[200px] py-2"> 
            <ul>
              <li className="flex justify-center cursor-pointer hover:font-bold transition duration-300 ease-in-out text-center">
                <Link href={'/my-profile'}>My profile</Link>
              </li>
              <li onClick={async () =>{ 
              try{
                await  signOut({redirectTo: "/log-in"});
              }catch(e){
            console.error("Error signing out:", e);
              }

            }} className="flex justify-center cursor-pointer hover:font-bold transition duration-300 ease-in-out text-center">Logout &nbsp;<Image alt="logout_image" src={'icons/logout.svg'} width={20} height={20} /></li>
            
            </ul>
            </PopoverContent>
          </Popover>
        </li>
      </ul>
    </header>
  );
};
