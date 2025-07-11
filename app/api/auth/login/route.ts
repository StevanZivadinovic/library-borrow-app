// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Pronađi korisnika po email-u
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (user.length === 0) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Provera passworda
    const isPasswordValid = await compare(password, user[0].password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Vrati korisnika bez passworda
    const { password: _, ...userData } = user[0];

    return NextResponse.json({ user: userData });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
