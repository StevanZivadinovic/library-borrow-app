import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import 'dotenv/config'

const Home=async () =>{
  const result = await db.select().from(users);
  console.log("Users:", result);
  return    <>
  <BookOverview {...sampleBooks[3]}/>
  <BookList
  title={"Popular Books"}
  books={sampleBooks}
  containerClassName={'mt-28'}  />
  </> 
}

export default Home;
