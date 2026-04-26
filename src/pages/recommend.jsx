import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./recommend.scss";
import useStore from "./Store/store";

const Recommend = () => {
  const { booksList } = useStore();

  const [userWorry, setUserWorry] = useState("");
  const [worryResults, setWorryResults] = useState([]);
  const [historyResults, setHistoryResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const KAKAO_API_KEY = "895559b4f45cd858c4fcd679aa17c38b";

  // 📚 카카오 API
  const fetchBooks = async (query) => {
    try {
      const res = await axios.get("https://dapi.kakao.com/v3/search/book", {
        params: { query, size: 4 },
        headers: { Authorization: `KakaoAK ${KAKAO_API_KEY}` },
      });
      return res.data.documents;
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  // ⭐ 첫 화면
  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      const books = await fetchBooks("베스트셀러 책");
      setWorryResults(books);
      setIsLoading(false);
    };
    init();
  }, []);

  // 내 서재 기반
  useEffect(() => {
    const loadHistory = async () => {
      if (!booksList || booksList.length === 0) return;

      setIsLoading(true);

      const keywords = booksList
        .slice(0, 5)
        .map((b) => b.title.split(" ")[0])
        .join(" ");

      const books = await fetchBooks(keywords + " 책 추천");
      setHistoryResults(books);

      setIsLoading(false);
    };

    loadHistory();
  }, [booksList]);

  // 검색
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!userWorry.trim()) return;

    setIsLoading(true);
    const books = await fetchBooks(userWorry + " 책");
    setWorryResults(books);
    setIsLoading(false);
  };

  // 📦 핵심 렌더 
  const renderBooks = (books) => {
    if (isLoading) return <p>불러오는 중...</p>;
    if (!books || books.length === 0) return null;

    return (
      <div className="book-result-grid">
        {books.map((book, idx) => (
          <div key={`${book.isbn}-${idx}`} className="book-item">
            <Link to={`/book?isbn=${book.isbn}`}>
              <img
                src={
                  book.thumbnail ||
                  "https://via.placeholder.com/120x174?text=No+Image"
                }
                alt={book.title}
              />
              <div className="book-info">{book.title}</div>
            </Link>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="recommend-container">
      <h1>📖 도서 추천</h1>

      {/* 📜 내 서재 */}
      {booksList && booksList.length > 0 && (
        <section className="recommend-section">
          <h3>📜 내 서재 기반 추천</h3>
          <p className="recommend-reason">
            당신의 서재 취향을 분석해 추천한 도서입니다.
          </p>

          {/* ⭐ 여기 안에서 렌더 */}
          {renderBooks(historyResults)}
        </section>
      )}

      <hr />

      {/* 💡 검색 */}
      <section className="recommend-section">
        <h3>💡 고민을 해결할 책을 찾아보세요</h3>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="예: 인간관계, 자기계발"
            value={userWorry}
            onChange={(e) => setUserWorry(e.target.value)}
          />
          <button type="submit">검색</button>
        </form>
      </section>

      {/* ⭐ 검색 결과는 따로 */}
      <section className="recommend-section">
        {renderBooks(worryResults)}
      </section>
    </div>
  );
};

export default Recommend;