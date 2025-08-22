import { borrowRecords } from "@/database/schema";
import { InferSelectModel } from "drizzle-orm";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

  export const fetchBorrowedBooks = async (setBorrowBooksData:Dispatch<SetStateAction<InferSelectModel<typeof borrowRecords>[]>>) => {
       try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/get-borrowed-books`);
      if (!res.ok) {
        throw new Error("Failed to fetch books");
      }
      const booksData = await res.json();
      setBorrowBooksData(booksData)
    } catch (error) {
      console.error("Error fetching books:", error);
      toast("Failed to load books. Please try again.");
    }
  };