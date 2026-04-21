import axios from "axios";
import React, { useEffect, useState } from "react";
import "./BookDetail.scss"; // SCSS 임포트

const BookDetail = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [authorBooks, setAuthorBooks] = useState([]);
  const [rating, setRating] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const key = "KakaoAK 895559b4f45cd858c4fcd679aa17c38b";

  const bookdata01 = async () => {
    try {
      const response01 = await axios.get(
        "https://dapi.kakao.com/v3/search/book",
        {
          params: { query: "지옥", sort: "accuracy", page: 1, size: 1 },
          headers: { Authorization: key },
        },
      );
      const mainBook = response01.data.documents[0];
      setSelectedBook(mainBook);

      if (mainBook) {
        const response02 = await axios.get(
          "https://dapi.kakao.com/v3/search/book",
          {
            params: {
              query: mainBook.authors[0],
              sort: "accuracy",
              page: 1,
              size: 6,
            },
            headers: { Authorization: key },
          },
        );
        setAuthorBooks(response02.data.documents);
      }
    } catch (e) {
      console.log("에러가 났습니다." + e);
    }
  };

  useEffect(() => {
    bookdata01();
  }, []);

  if (!selectedBook) {
    return (
      <div className="book-detail-container">
        <div className="loading-box">데이터를 불러오는 중입니다...</div>
      </div>
    );
  }

  const fullText = selectedBook.contents;
  const shortText = fullText.substring(0, 100);
  const isLongText = fullText.length > 100;

  return (
    <div className="book-detail-container">
      {/* 상단: 책 상세 정보 */}
      <section className="header-section">
        <a href={selectedBook.url} target="_blank" rel="noopener noreferrer">
          <img
            src={selectedBook.thumbnail}
            alt="cover"
            className="main-img"
            title="클릭하면 상세 페이지로 연결됩니다."
          />
        </a>
        <div className="info-box">
          <h1 className="title">{selectedBook.title}</h1>
          <p className="meta-info">
            <strong>저자:</strong> {selectedBook.authors.join(", ")} |{" "}
            <strong>출판사:</strong> {selectedBook.publisher}
          </p>

          {/* 별점 */}
          <div className="rating-section">
            <div className="star-container">
              {[1, 2, 3, 4, 5].map((num) => (
                <span
                  key={num}
                  className={`star ${num <= rating ? "active" : ""}`}
                  onClick={() => setRating(rating === num ? 0 : num)}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="rating-text">
              {rating > 0 ? `${rating}점` : "별점을 선택해주세요"}
            </span>
          </div>

          <div className="divider" />

          {/* 컨텐츠 (더 보기) */}
          <p className="contents">
            {isExpanded || !isLongText ? fullText : shortText + "..."}
            {isLongText && (
              <button
                className="more-btn"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "접기" : "더보기"}
              </button>
            )}
          </p>
        </div>
      </section>

      {/* 하단: 작가의 다른 도서 */}
      <section>
        <h3 className="sub-title">이 작가의 다른 도서</h3>
        <div className="book-grid">
          {authorBooks.map((book, idx) => (
            <div key={idx} className="grid-item">
              <a href={book.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={
                    book.thumbnail ||
                    "https://via.placeholder.com/120x174?text=No+Image"
                  }
                  alt={book.title}
                  className="grid-img"
                />
              </a>
              <p className="grid-title">{book.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BookDetail;
