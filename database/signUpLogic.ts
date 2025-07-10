"use server";
import bcrypt from "bcryptjs";
import { db } from "@/database/drizzle";
import { users } from "./schema";
import { z } from "zod";
import { signInSchema } from "@/lib/validations";

const signUpLogicSubmit = async (values: z.infer<typeof signInSchema>) => {
  try {
    const hashedPassword = await bcrypt.hash(values.password, 10);
    const userToInsert = {
  ...values,
  password: hashedPassword,
};

    await db.insert(users).values(userToInsert);

    return { success: true };
  } catch (error) {
    console.error("Error inserting user:", error);
    throw new Error("Failed to create user");
  }
};

export default signUpLogicSubmit;
