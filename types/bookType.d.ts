interface BookType {
    id: string
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description?: string;
  coverColor: string;
  coverUrl: string;
  // videoUrl:string;
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

interface BorrowBookParams {
  bookId: string;
  userId: string;
}
