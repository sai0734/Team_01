import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import "./BookDetail.scss";

const BookDetail = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [authorBooks, setAuthorBooks] = useState([]);
  const [rating, setRating] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  // 카카오 REST API 키
  const KAKAO_KEY = "KakaoAK 895559b4f45cd858c4fcd679aa17c38b";

  const fetchBookData = useCallback(async () => {
    try {
      // 1. 메인 도서 검색 (쿼리: "지옥")
      const response01 = await axios.get(
        "https://dapi.kakao.com/v3/search/book",
        {
          params: { query: "지옥", sort: "accuracy", page: 1, size: 1 },
          headers: { Authorization: KAKAO_KEY },
        },
      );

      const mainBook = response01.data.documents[0];
      setSelectedBook(mainBook);

      // 2. 해당 도서의 첫 번째 저자로 다른 도서 검색
      if (mainBook && mainBook.authors.length > 0) {
        const authorName = mainBook.authors[0];
        const response02 = await axios.get(
          "https://dapi.kakao.com/v3/search/book",
          {
            params: {
              query: authorName,
              sort: "accuracy",
              page: 1,
              size: 10,
            },
            headers: { Authorization: KAKAO_KEY },
          },
        );

        // 현재 페이지에 보여지는 메인 도서는 리스트에서 제외
        const filteredBooks = response02.data.documents
          .filter((book) => book.isbn !== mainBook.isbn)
          .slice(0, 6);

        setAuthorBooks(filteredBooks);
      }
    } catch (e) {
      console.error("데이터를 가져오는 중 에러가 발생했습니다: ", e);
    }
  }, []);

  useEffect(() => {
    fetchBookData();
  }, [fetchBookData]);

  // 로딩 상태 처리
  if (!selectedBook) {
    return (
      <div className="book-detail-container">
        <div className="loading-box">데이터를 불러오는 중입니다...</div>
      </div>
    );
  }

  // 텍스트 줄임 처리 로직
  const fullText = selectedBook.contents || "상세 설명이 없습니다.";
  const shortText = fullText.substring(0, 100);
  const isLongText = fullText.length > 100;

  return (
    <div className="book-detail-container">
      {/* 상단: 책 상세 정보 섹션 */}
      <section className="header-section">
        <a href={selectedBook.url} target="_blank" rel="noopener noreferrer">
          <img
            src={selectedBook.thumbnail}
            alt={selectedBook.title}
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

          {/* 별점 선택 영역 */}
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

          {/* 책 소개 및 더보기 버튼 */}
          <div className="contents">
            {isExpanded || !isLongText ? fullText : shortText + "..."}
            {isLongText && (
              <button
                className="more-btn"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "접기" : "더보기"}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 하단: 작가의 다른 도서 섹션 */}
      <section>
        <h3 className="sub-title">이 작가의 다른 도서</h3>
        <div className="book-grid">
          {authorBooks.length > 0 ? (
            authorBooks.map((book, idx) => (
              <div key={book.isbn || idx} className="grid-item">
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
            ))
          ) : (
            <p
              style={{ gridColumn: "1/-1", textAlign: "center", color: "#999" }}
            >
              관련 도서가 없습니다.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default BookDetail;
