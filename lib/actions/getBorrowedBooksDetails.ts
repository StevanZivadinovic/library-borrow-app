import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { eq, InferSelectModel } from "drizzle-orm";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export const fetchBorrowedBooksDetails = async (
  // setBookDetails: Dispatch<SetStateAction<BookType[]>>,
  book: InferSelectModel<typeof borrowRecords>
) => {
    try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/get-borrowed-book-data?bookID=${book.bookId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );
    const booksData = await res.json();
    return booksData;

  } catch (error) {
    console.error("Error fetching books:", error);
    toast("Failed to load books. Please try again.");
  }
};
