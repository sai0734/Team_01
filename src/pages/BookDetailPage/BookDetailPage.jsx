import BookDetail from "./BookDetail";
import MemoSection from "./MemoSection";
import { useSearchParams } from "react-router-dom";

const BookDetailPage = () => {
  const [searchParams] = useSearchParams();

  const isbn = searchParams.get("isbn");

  return (
    <div>
      <BookDetail isbn={isbn} />
      {isbn && <MemoSection isbn={isbn} />}
    </div>
  );
};

export default BookDetailPage;
