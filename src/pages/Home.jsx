import React from "react";
import { Link } from "react-router-dom";
import Recommend from "./recommend";
import Mylibrary from "./mylibrary";
import SearchHeader from "../components/SearchHeader";
<<<<<<< HEAD
import "./Home.scss"; 
=======
import useStore from "./Store/store";
>>>>>>> e1c055a3cd74199183c7ae52c3a76c05d6f29c7a

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
      
      {/* 1. 검색창 섹션 */}
      <div className="search-section">
        <SearchHeader />
      </div>

      <main className="home-main">
        {/* 2. AI 안내 및 중앙 문구 섹션 */}
        {/* <div className="ai-intro-section">
          <div className="intro-badge-group">
            <span>AI 맞춤 도서 추천</span>
            <span>내 독서 히스토리 분석</span>
            <span>✨</span>
          </div>
          
          <div className="intro-description">
            <p className="highlight-text">요즘 어떤 고민이 있으신가요?</p>
            <p>고민을 분석하여 해결에 도움을 줄 책을 찾아드립니다.</p>
          </div>
          
          <button className="ai-button-main">AI 추천받기</button>
        </div> */}

        {/* 3. 도서 추천 리스트 섹션 */}
        <section className="section-spacing">
          <Recommend />
        </section>

<<<<<<< HEAD
        {/* 4. 내 서재 섹션 (필요 시 주석 해제) */}
        {/* <section className="section-spacing">
          <div className="flex-header">
            <h2 className="section-title">현재 읽고 있는 책</h2>
            <Link to="/mypage" className="more-link">내 서재 가기 →</Link>
          </div>
          <Mylibrary />
        </section> 
        */}
=======
        {/* 3. 읽고 있는 책들 (서재) 섹션 */}
        <section className={`shelf-section`}>
          <div className="shelf-header">
            <h3>
              읽고 있는 책 <span>({readingBooks.length})</span>
            </h3>
          </div>
          <div className="shelf-content">{renderBookGrid(readingBooks)}</div>
        </section>
>>>>>>> e1c055a3cd74199183c7ae52c3a76c05d6f29c7a
      </main>
    </div>
  );
};

export default Home;
