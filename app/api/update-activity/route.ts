// app/api/update-activity/route.ts
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

import { auth } from "@/auth"

export async function POST() {
  const session = await auth()

  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const today = new Date().toISOString().slice(0, 10);

  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);

  if (user[0]?.lastActivityDate === today) {
    return new Response("Already updated", { status: 200 });
  }

  await db
    .update(users)
    .set({ lastActivityDate: today })
    .where(eq(users.id, session.user.id));

  return new Response("Activity updated", { status: 200 });
}
