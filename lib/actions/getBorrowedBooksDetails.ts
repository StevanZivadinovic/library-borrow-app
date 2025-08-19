import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export const fetchBorrowedBooksDetails = async (
  setBookDetails: Dispatch<SetStateAction<BookType[]>>,
  book: BookType
) => {
  try {
    console.log("Fetching book details for:", book.id);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/get-borrowed-book-data?bookID=${book.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );
    const booksData = await res.json();
    console.log("Fetched book details:", booksData);
    setBookDetails(prev => [...prev, booksData]);
  } catch (error) {
    console.error("Error fetching books:", error);
    toast("Failed to load books. Please try again.");
  }
};
