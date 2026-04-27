import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Recommend from "./recommend";
import Mylibrary from "./mylibrary";
import SearchHeader from "../components/SearchHeader";
import useStore from "./Store/store"; // 스토어 임포트 유지
import "./Home.scss"; // 스타일 임포트 유지
import useScroll from "../components/useScroll";

const Home = () => {
  const scrollTop = useScroll();

  useEffect(() => {
    scrollTop();
  }, [scrollTop]);

  const { booksList } = useStore();

  // 읽고 있는 책 필터링
  const readingBooks = booksList.filter(
    (book) => book.status === "읽고 있는 책",
  );

  const renderBookGrid = (books) => {
    if (books.length === 0) {
      return <p className="empty-msg">서재에 담긴 책이 없습니다.</p>;
    }

    return (
      <div className="book-grid">
        {books.map((book) => (
          <div key={book.isbn} className="book-item">
            <Link to={`/book?isbn=${book.isbn}`}>
              <img
                src={
                  book.thumbnail ||
                  "https://via.placeholder.com/120x174?text=No+Image"
                }
                alt={book.title}
              />
            </Link>
            <div className="book-info">
              <p className="book-title">{book.title}</p>
              {book.rating > 0 && (
                <p className="book-rating">★ {book.rating}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="home-container">
      {/* 1. 검색창 섹션 */}
      <div className="search-section">
        <SearchHeader />
      </div>

      <main className="home-main">
        {/* 2. 도서 추천 리스트 섹션 */}
        <section className="section-spacing">
          <Recommend />
        </section>

        {/* 3. 읽고 있는 책들 (서재) 섹션 */}
        <section className="shelf-section section-spacing">
          <div className="shelf-header">
            <h3>
              읽고 있는 책 <span>({readingBooks.length})</span>
            </h3>
            <Link to="/mypage" className="more-link">
              내 서재 가기 →
            </Link>
          </div>
          <div className="shelf-content">{renderBookGrid(readingBooks)}</div>
        </section>
      </main>
    </div>
  );
};

export default Home;
