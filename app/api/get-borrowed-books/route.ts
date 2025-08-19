// app/api/update-activity/route.ts
import { db } from "@/database/drizzle";
import { borrowRecords } from "@/database/schema";
import { eq } from "drizzle-orm";

import { auth } from "@/auth"

export async function GET() {
  const session = await auth()

  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
      const booksArrayData = await db.select().from(borrowRecords).where(eq(borrowRecords.userId, session.user.id));
      return new Response(JSON.stringify(booksArrayData), {status: 200})
  }catch(error){
        console.error("Error fetching books:", error);
        return new Response("Internal Server Error", { status: 500 });
  }
}
