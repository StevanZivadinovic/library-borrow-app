interface BookType {
    id: number
  title: string;
  author: string;
  genre: string;
  rating: number;
  total_copies: number;
  available_copies: number;
  description: string;
  color: string;
  cover: string;
  video:string;
  summary:string;
  isLoandedBook?: boolean;
  isBorrowed?: boolean;

}
interface BookCardProps {
  book: BookType;
  bookWidth?: string;
  bookBorrowedStyle?: string;
  isMyProfile?: boolean;
}
