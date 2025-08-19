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
    const bookID = searchParams.get("bookID");

    if (!bookID) {
      return new Response("Missing bookID", { status: 400 });
    }

    // const bookID = req.body ? req.body.bookID;
    console.log("Book ID:", borrowRecords.id);
       const res= await db
                     .select()
                     .from(borrowRecords)
                     .where(eq(borrowRecords.id, bookID))
                     .limit(1);
                     console.log("Book Details:", res);
      if (!res || res.length === 0) {
        throw new Error("Failed to fetch books");
      }
    
      return new Response(JSON.stringify(res), {status: 200})
  }catch(error){
        console.error("Error fetching books:", error);
        return new Response("Internal Server Error", { status: 500 });
  }
}
