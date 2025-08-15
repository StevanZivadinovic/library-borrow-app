import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

  export const fetchBooks = async (setBooksData:Dispatch<SetStateAction<BookType[]>>) => {
       try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/get-books`);
      if (!res.ok) {
        throw new Error("Failed to fetch books");
      }
      const booksData = await res.json();
      setBooksData(booksData)
    } catch (error) {
      console.error("Error fetching books:", error);
      toast("Failed to load books. Please try again.");
    }
  };