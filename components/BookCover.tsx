import { cn } from "@/lib/utils";
import { BookCoverType, variantStyles } from "@/types/types";
import Image from "next/image";

import React from "react";




export const BookCover = ({
  className,
  variant="regular",
  coverColor="#012B48",
  coverImage="https://placehold.co/400x600.png",
}: BookCoverType) => {
  return <div
  className={
  cn(
    "relative transition-all duration-300",
    variantStyles[variant],
    className,
  )}
  >
    Book Side Svg
    <div className="absolute z-10" style={{left:'12%', width:'87.5%', height:'100%'}}>

  <Image
  src={coverImage}
  alt="Book cover"
  fill
  className="rounded-sm object-fill"

  />
  

    </div>
  </div>;
};
