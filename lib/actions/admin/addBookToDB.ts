"use server"
import { db } from "@/database/drizzle"
import { books } from "@/database/schema";


export const addBookToDB = async (bookData:BookType) => {

    try {
        const data = await db.insert(books).values(bookData).returning();
        return { success: true, message: "Book added successfully",data:data[0] };
    } catch (error) {

        console.error("Error adding book to database:", error);
        return { success: false, message: "Failed to add book to database" };
        
    }

}