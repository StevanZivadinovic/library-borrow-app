import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";
import 'dotenv/config'

const Home=async () =>{
  return    <>
  <BookOverview {...sampleBooks[3]}/>
  <BookList
  title={"Popular Books"}
  books={sampleBooks}
  containerClassName={'mt-28'}  />
  </> 
}

export default Home;
