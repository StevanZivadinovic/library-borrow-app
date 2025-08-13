import BookOverview from "@/components/BookOverview";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

const BookDetails = async ({
  params,
}: {
  params: Promise<{
      id: string; 
}>;
}) => { 
    const  {id}  = await params;
    let bookDetails: BookType[] = [];
  try {
       bookDetails = await db
          .select()
          .from(books)
          .where(eq(books.id, id))
          .limit(1);
          console.log("Book Details:", bookDetails);
  }catch (error) {
console.error("Error fetching book details:", error);
  }

  if (!bookDetails) redirect("/not-found");
  return (
    <div className="text-white">
          <BookOverview {...bookDetails[0]} />
    </div>
  );
};

export default BookDetails;
