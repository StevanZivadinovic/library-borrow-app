  
  type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";
   export  const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};

export interface BookCoverType{
className?:string;
  variant:BookCoverVariant;
  coverColor:string;
  coverImage:string;
}
