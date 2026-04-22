import BookDetail from "./BookDetail";
import MemoSection from "./MemoSection";
import { useSearchParams } from "react-router-dom";

const BookDetailPage = ({ header }) => {
  const [searchParams] = useSearchParams();

  const isbn = header || searchParams.get("isbn");

  console.log(isbn);

  return (
    <div>
      <BookDetail isbn={isbn} />
      {isbn && <MemoSection isbn={isbn} />}
    </div>
  );
};

export default BookDetailPage;
