// app/api/update-activity/route.ts
import { db } from "@/database/drizzle";
import { books, users } from "@/database/schema";
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
      const booksArrayData = await db.select().from(books).where(eq(books.id, session.user.id));
      return new Response(JSON.stringify(booksArrayData), {status: 200})
  }catch(error){
        console.error("Error fetching books:", error);
        return new Response("Internal Server Error", { status: 500 });
  }
}
