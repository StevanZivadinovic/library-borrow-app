import { cn } from "@/lib/utils";
import { BookCoverType, variantStyles } from "@/types/types";
import Image from "next/image";

import React from "react";
import BookCoverSvg from "./BookCoverSvg";




export const BookCover = ({
  className,
  variant="regular",
  coverColor="#012B48",
  coverImage="https://placehold.co/400x600.png",
}: BookCoverType) => {
  return <div
  className={
  cn(
    "relative",
    variantStyles[variant],
    className,
  )}
  >
    <BookCoverSvg coverColor={coverColor}/>
    <div className="relative  z-100" style={{left:'12%', width:'87.5%', height:'85%'}}>

  <Image
  src={coverImage}
  alt="Book cover"
  width={180}
  height={250}
  className="rounded-sm rounded-bl-none rounded-tl-none h-[90%] w-[80%]"
  />
  

    </div>
  </div>;
};
