"use server";

import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";
import { headers } from "next/headers";
import { ratelimitLogin, ratelimitRegister } from "../ratelimit";
import { redirect } from "next/navigation";
import config from "@/config";
import { workflowClient } from "../workflow";

// import { workflowClient } from "@/lib/workflow";
// import config from "@/lib/config";

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;
  console.log("Signing in with credentials:", { email, password });
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimitLogin.limit(ip);

  // if (!success) return redirect("/too-fast");
  if (!success) {
    console.log("Rate limit exceeded for IP:", ip);
    return { success: false, error: "Too fast, ratelimit overwhelmed" };
  }

  try {
    const result = (await signIn("credentials", {
      email,
      password,
      redirect: false,
    })) as { error?: string; user?: any };

    console.log("Sign-in result:", result);
    if (result?.error) {
      console.log("Sign-in error:", result.error);
      return { success: false, error: result.error };
    }

    return { success: true, user: result?.user };
  } catch (error) {
    console.log(error, "Signin error!");
    return { success: false, error: "Signin error!" };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { fullName, email, universityId, password, universityCard } = params;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimitRegister.limit(ip);
    if (!success) return redirect("/too-fast");

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return { success: false, error: "User already exists!" };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      fullName,
      email,
      universityId,
      password: hashedPassword,
      universityCard,
    });

    await workflowClient.trigger({
      url: `${config.env.upstash.upstashWorkflowUrl}/api/workflow`,
      body: {
        email,
        fullName,
      },
    });

    const loginResult = await signInWithCredentials({ email, password });

    if (!loginResult.success) {
      return { success: false, error: "Auto-login failed!" };
    } else {
      return { success: true, user: { email, fullName } };
    }
  } catch (error) {
    console.log(error, "Signup error!");
    return { success: false, error: "Signup error!" };
  }
};
