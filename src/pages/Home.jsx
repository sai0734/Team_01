import React from "react";
import { Link } from "react-router-dom";
import Recommend from "./recommend";
import Mylibrary from "./mylibrary";
import "./Home.scss"; 
import SearchHeader from "../components/SearchHeader";
import useStore from "./Store/store";

const Home = () => {
  const { booksList } = useStore();

  // 읽고 있는 책 서재
  const readingBooks = booksList.filter(
    (book) => book.status == "읽고 있는 책",
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
      <header className="home-header">
        <h1>맞춤형 독서 큐레이션</h1>
        <p>오늘도 한 페이지 성장하세요</p>
      </header>
        <SearchHeader />
      <main className="home-main">
        {/* 1. 상단 내비게이션 링크 */}

        {/* 2. 고민 기반 AI 도서 추천 섹션 */}
        <section className="section">
          {/* <h2 className="section-title">고민 해결 책 큐레이션</h2> */}
          <Recommend />
        </section>

        {/* 3. 읽고 있는 책들 (서재) 섹션 */}
        <section className={`shelf-section`}>
          <div className="shelf-header">
            <h3>
              읽고 있는 책 <span>({readingBooks.length})</span>
            </h3>
          </div>
          <div className="shelf-content">{renderBookGrid(readingBooks)}</div>
        </section>
      </main>
    </div>
  );
};

export default Home;
