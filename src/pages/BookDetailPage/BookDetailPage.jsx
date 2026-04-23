import BookDetail from "./BookDetail";
import MemoSection from "./MemoSection";
import { useSearchParams } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

const BookDetailPage = ({ header }) => {
  // 쿼리 스트링으로 key값 받아오기
  const [searchParams] = useSearchParams();
  // props 또는 useSearchParams 둘중 하나로 isbn값 가져오기
  const isbn = header || searchParams.get("isbn");
  console.log(isbn);

  const moveTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <BookDetail isbn={isbn} />
      {isbn && <MemoSection isbn={isbn} />}
      <ScrollToTop />
    </div>
  );
};

export default BookDetailPage;
