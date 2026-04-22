import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import "./BookDetail.scss";
import useStore from "../Store/store";
import { Link } from "react-router-dom";

const BookDetail = ({ isbn }) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [authorBooks, setAuthorBooks] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  // Zustand 스토어 연동 (updateRating 추가)
  const { booksList, addBook, bookState, readbook, removeBook, updateRating } =
    useStore();

  // 현재 책이 서재에 있는지 확인
  const currentBookInStore = booksList.find(
    (item) => item.isbn === selectedBook?.isbn,
  );

  // 화면에 표시할 별점 (서재에 있으면 스토어 값, 없으면 0)
  const displayRating = currentBookInStore ? currentBookInStore.rating : 0;

  const KAKAO_KEY = "KakaoAK 895559b4f45cd858c4fcd679aa17c38b";

  const fetchBookData = useCallback(async () => {
    try {
      // const loc = location.href;
      // const isbn = loc.substring(loc.indexOf("=") + 1);
      // console.log(location);

      const response01 = await axios.get(
        "https://dapi.kakao.com/v3/search/book",
        {
          params: {
            query: isbn.toString().split(" ")[0],
            sort: "accuracy",
            page: 1,
            size: 1,
            target: "isbn",
          },
          headers: { Authorization: KAKAO_KEY },
        },
      );

      const mainBook = response01.data.documents[0];
      setSelectedBook(mainBook);

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

        const filteredBooks = response02.data.documents
          .filter((book) => book.isbn !== mainBook.isbn)
          .slice(0, 6);

        setAuthorBooks(filteredBooks);
      }
    } catch (e) {
      console.error("데이터를 가져오는 중 에러가 발생했습니다: ", e);
    }
  }, [isbn]);

  useEffect(() => {
    fetchBookData();
  }, [fetchBookData]);

  if (!selectedBook) {
    return (
      <div className="book-detail-container">
        <div className="loading-box">데이터를 불러오는 중입니다...</div>
      </div>
    );
  }

  // 별점 클릭 핸들러
  const handleRatingClick = (num) => {
    if (!currentBookInStore) {
      alert("먼저 '내 서재에 담기'를 눌러주세요!");
      return;
    }
    const newRating = displayRating === num ? 0 : num;
    updateRating(selectedBook.isbn, newRating);
  };

  const fullText = selectedBook.contents || "상세 설명이 없습니다.";
  const shortText = fullText.substring(0, 100);
  const isLongText = fullText.length > 100;

  const handleRemove = () => {
    if (window.confirm("이 책을 서재에서 삭제하시겠습니까?")) {
      removeBook(selectedBook.isbn);
    }
  };

  console.log(selectedBook);
  console.log(booksList);

  return (
    <div className="book-detail-container">
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

          {/* 별점 선택 영역 - 스토어와 연결됨 */}
          <div className="rating-section">
            <div className="star-container">
              {[1, 2, 3, 4, 5].map((num) => (
                <span
                  key={num}
                  className={`star ${num <= displayRating ? "active" : ""}`}
                  onClick={() => handleRatingClick(num)}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="rating-text">
              {displayRating > 0 ? `${displayRating}점` : "별점을 선택해주세요"}
            </span>
          </div>

          <div className="store-control-section">
            {!currentBookInStore ? (
              <button className="add-btn" onClick={() => addBook(selectedBook)}>
                내 서재에 담기
              </button>
            ) : (
              <div className="edit-controls">
                <div className="control-group">
                  <label>독서 상태</label>
                  <select
                    value={currentBookInStore.status}
                    onChange={(e) =>
                      bookState(selectedBook.isbn, e.target.value)
                    }
                  >
                    <option value="안 읽은 책">안 읽은 책</option>
                    <option value="읽고 있는 책">읽고 있는 책</option>
                    <option value="읽은 책">읽은 책</option>
                  </select>
                </div>
                <div className="control-group">
                  <label>읽은 날짜</label>
                  <input
                    type="date"
                    value={currentBookInStore.readDate || ""}
                    disabled={currentBookInStore.status !== "읽은 책"}
                    onChange={(e) =>
                      readbook(selectedBook.isbn, e.target.value)
                    }
                  />
                </div>
                <div className="status-group">
                  <span className="status-badge-btn">서재 보관 중</span>
                  <button className="remove-btn" onClick={handleRemove}>
                    서재에서 제거
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="divider" />

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

      <section>
        <h3 className="sub-title">이 작가의 다른 도서</h3>
        <div className="book-grid">
          {authorBooks.length > 0 ? (
            authorBooks.map((book, idx) => (
              <div key={book.isbn || idx} className="grid-item">
                <Link to={`/book?isbn=${book.isbn}`}>
                  <img
                    src={
                      book.thumbnail ||
                      "https://via.placeholder.com/120x174?text=No+Image"
                    }
                    alt={book.title}
                    className="grid-img"
                  />
                </Link>
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
