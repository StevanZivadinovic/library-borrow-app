import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";
import 'dotenv/config'

export default function Home() {
  return    <>
  <BookOverview {...sampleBooks[3]}/>
  <BookList
  title={"Popular Books"}
  books={sampleBooks}
  containerClassName={'mt-28'}  />
  </> 
}
