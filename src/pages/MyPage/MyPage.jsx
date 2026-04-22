import React, { useState } from "react";
import useStore from "../Store/store"; // 경로 확인 필요!
import "./MyPage.scss";

const MyPage = () => {
  const { booksList } = useStore();

  // 각 섹션의 펼침/닫힘 상태 관리
  const [openSections, setOpenSections] = useState({
    unread: true, // 안 읽은 책 (기본값: 열림)
    reading: true, // 읽고 있는 책
    read: false, // 읽은 책
  });

  // 섹션 토글 함수
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // 상태별 책 분류
  const unreadBooks = booksList.filter((b) => b.status === "안 읽은 책");
  const readingBooks = booksList.filter((b) => b.status === "읽고 있는 책");
  const readBooks = booksList.filter((b) => b.status === "읽은 책");

  // 책 렌더링 함수 (중복 방지)
  const renderBookGrid = (books) => {
    if (books.length === 0) {
      return <p className="empty-msg">서재에 담긴 책이 없습니다.</p>;
    }

    return (
      <div className="book-grid">
        {books.map((book) => (
          <div key={book.isbn} className="book-item">
            <a href={`/?isbn=${book.isbn}`}>
              <img
                src={
                  book.thumbnail ||
                  "https://via.placeholder.com/120x174?text=No+Image"
                }
                alt={book.title}
              />
            </a>
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
    <div className="mypage-container">
      <h2 className="page-title">나의 서재</h2>

      {/* 1. 안 읽은 책 섹션 */}
      <section
        className={`shelf-section ${openSections.unread ? "is-open" : ""}`}
      >
        <div className="shelf-header" onClick={() => toggleSection("unread")}>
          <h3>
            안 읽은 책 <span>({unreadBooks.length})</span>
          </h3>
          <span className="arrow">{openSections.unread ? "▲" : "▼"}</span>
        </div>
        {openSections.unread && (
          <div className="shelf-content">{renderBookGrid(unreadBooks)}</div>
        )}
      </section>

      {/* 2. 읽고 있는 책 섹션 */}
      <section
        className={`shelf-section ${openSections.reading ? "is-open" : ""}`}
      >
        <div className="shelf-header" onClick={() => toggleSection("reading")}>
          <h3>
            읽고 있는 책 <span>({readingBooks.length})</span>
          </h3>
          <span className="arrow">{openSections.reading ? "▲" : "▼"}</span>
        </div>
        {openSections.reading && (
          <div className="shelf-content">{renderBookGrid(readingBooks)}</div>
        )}
      </section>

      {/* 3. 읽은 책 섹션 */}
      <section
        className={`shelf-section ${openSections.read ? "is-open" : ""}`}
      >
        <div className="shelf-header" onClick={() => toggleSection("read")}>
          <h3>
            읽은 책 <span>({readBooks.length})</span>
          </h3>
          <span className="arrow">{openSections.read ? "▲" : "▼"}</span>
        </div>
        {openSections.read && (
          <div className="shelf-content">{renderBookGrid(readBooks)}</div>
        )}
      </section>
    </div>
  );
};

export default MyPage;
