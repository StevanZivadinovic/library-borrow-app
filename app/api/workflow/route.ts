import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { sendEmail } from "@/lib/workflow";
import { serve } from "@upstash/workflow/nextjs"
import { eq } from "drizzle-orm";

type UserState = "non-active" | "active";

type InitialData = {
  email: string;
  fullName: string;
  typeOFmail: "welcome" | "not-active" | "active";

};

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;
const THIRTY_DAYS_IN_MS = 30 * ONE_DAY_IN_MS;

const getUserState = async (email: string): Promise<UserState> => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (user.length === 0) return "non-active";

  const lastActivityDate = new Date(user[0].lastActivityDate!);
  const now = new Date();
  const timeDifference = now.getTime() - lastActivityDate.getTime();

  if (
    timeDifference > THREE_DAYS_IN_MS &&
    timeDifference <= THIRTY_DAYS_IN_MS
  ) {
    return "non-active";
  }

  return "active";
};

export const { POST } = serve(
  async (context) => {
    console.log("Workflow started with payload:", context.requestPayload);
    const {fullName, email} = context.requestPayload as InitialData
  
    await context.run("initial-step", async () => {
           await sendEmail({ fullName, email, typeOFmail: "welcome" });
    })
     await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3);
    while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email);
    });

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
           await sendEmail({ fullName, email, typeOFmail: "not-active" });
     
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
           await sendEmail({ fullName, email, typeOFmail: "active" });
      });
    }

    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
    }
  },
  {
    retries: 3,
    // verbose: true,  
  }
);