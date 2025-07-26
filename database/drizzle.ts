import * as dotenv from "dotenv";
dotenv.config({
    path: ".env.local",
});
import config from "@/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const sql = neon(config.env.databaseUrl);

export const db = drizzle({ client: sql, casing: "snake_case" });