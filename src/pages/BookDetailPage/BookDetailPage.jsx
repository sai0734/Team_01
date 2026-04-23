import BookDetail from "./BookDetail";
import MemoSection from "./MemoSection";
import { useSearchParams } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import { useEffect } from "react";

const BookDetailPage = ({ header, scrollRef }) => {
  // 쿼리 스트링으로 key값 받아오기
  const [searchParams] = useSearchParams();
  // props 또는 useSearchParams 둘중 하나로 isbn값 가져오기
  const isbn = header || searchParams.get("isbn");
  console.log(isbn);

  const scrollTop = () => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0 });
    } else {
      window.scrollTo({ top: 0 });
    }
  };

  // 시작 위치가 계속 어긋나서 마운트시 스크롤을 가장 위에서 시작할수 있게 추가
  useEffect(() => {
    scrollTop();
  }, []);

  return (
    <div>
      <BookDetail isbn={isbn} />
      {isbn && <MemoSection isbn={isbn} />}
      <ScrollToTop scrollRef={scrollRef} />
    </div>
  );
};

export default BookDetailPage;
