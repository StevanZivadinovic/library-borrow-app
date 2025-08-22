// app/api/update-activity/route.ts
import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { eq } from "drizzle-orm";

import { auth } from "@/auth"

export async function GET(req: Request) {
  const session = await auth()

  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
     const { searchParams } = new URL(req.url);
    const borrowbookID = searchParams.get("bookID");
console.log("Received bookID:", borrowbookID);
    if (!borrowbookID) {
      return new Response("Missing bookID", { status: 400 });
    }

    console.log("Book ID:", books.id);
       const res= await db
                     .select()
                     .from(books)
                     .where(eq(books.id, borrowbookID))
                     .limit(1);
                     console.log("Book Details:", res);
      if (!res || res.length === 0) {
        throw new Error("Failed to fetch books");
      }
    
      return new Response(JSON.stringify(res), {status: 200})
  }catch(error){
        console.error("Error fetching books:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });

  }
}
