import React, { useEffect, useState } from "react";
// 필요한 컴포넌트나 라이브러리를 여기서 임포트하세요.
// 예: import { Link } from "react-router-dom";
import "./recommend.scss"; // 혹은 CSS 파일
import useStore from "./Store/store";
import { getRecommendation } from "./OllamaRecommend";
import axios from "axios";

const Recommend = () => {
  // 만약 추천 도서 데이터가 있다면 여기서 관리하거나 props로 받으세요.
  const recommendedBooks = [
    // { id: 1, title: "추천 도서 1", thumbnail: "..." },
  ];
  // 중복된 상태 선언 제거 및 하나로 합침
  const [userWorry, setUserWorry] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [aiKeyword, setAiKeyword] = useState("");
  const [historyResults, setHistoryResults] = useState([]);
  const [historyReason, setHistoryReason] = useState("");

  // Store에서 데이터 가져오기 (비구조화 할당 방식 확인 필요)
  const { booksList } = useStore();
  const KAKAO_API_KEY = "895559b4f45cd858c4fcd679aa17c38b";
  const GEMINI_API_KEY = "AIzaSyDimUJfqFc0uIyE_vd0iQztG7AucPe3aE0";

  // --- 기능 1: 내 서재 데이터 분석 추천 ---
  useEffect(() => {
    const analyzeLibrary = async () => {
      // booksList가 없거나 비어있으면 실행 안 함
      if (!booksList || booksList.length === 0) return;

      try {
        const bookTitles = booksList.map((b) => b.title).join(", ");

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `사용자가 읽은 책들: "${bookTitles}"\n이 책들의 공통적인 주제나 장르를 분석해서, 다음에 읽으면 좋을 책을 검색하기 위한 핵심 단어 딱 하나만 출력해줘.`,
                    },
                  ],
                },
              ],
            }),
          },
        );

        const geminiData = await geminiRes.json();

        if (geminiData.candidates && geminiData.candidates[0].content) {
          const keyword = geminiData.candidates[0].content.parts[0].text.trim();
          setHistoryReason(
            `사용자님의 '${booksList[booksList.length - 1].title}' 등 서재 기록을 분석해 찾은 키워드예요.`,
          );

          const kakaoRes = await axios.get(
            "https://dapi.kakao.com/v3/search/book",
            {
              params: { query: keyword, size: 5 },
              headers: { Authorization: `KakaoAK ${KAKAO_API_KEY}` },
            },
          );

          const filtered = kakaoRes.data.documents.filter(
            (rec) => !booksList.some((my) => my.isbn === rec.isbn),
          );
          setHistoryResults(filtered);
        }
      } catch (err) {
        console.error("서재 분석 실패:", err);
      }
    };

    analyzeLibrary();
  }, [booksList]);

  // --- 기능 2: 고민 기반 AI 검색 ---
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!userWorry.trim()) return;

  //   setIsSearching(true);
  //   setAiKeyword("고민 분석 중...");
  //   try {
  //     const result = await getRecommendation(booksList, userWorry);
  //     setAiKeyword(result);
  //   } catch (error) {
  //     console.error("검색 오류:", error);
  //   } finally {
  //     setIsSearching(false);
  //   }
  // };
  const handleSmartSearch = async (e) => {
    e.preventDefault();
    if (!userWorry.trim()) return;

    setIsSearching(true);
    setAiKeyword("고민 분석 중...");

    try {
      let searchKeyword = userWorry;

      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `고민: "${userWorry}"\n이 고민에 위로가 되거나 해결책이 될 책을 찾으려 해. 검색어 딱 하나만 알려줘.`,
                  },
                ],
              },
            ],
          }),
        },
      );

      const geminiData = await geminiRes.json();
      if (geminiData.candidates && geminiData.candidates[0].content) {
        searchKeyword = geminiData.candidates[0].content.parts[0].text.trim();
      }
      setAiKeyword(searchKeyword);

      const kakaoRes = await axios.get(
        "https://dapi.kakao.com/v3/search/book",
        {
          params: { query: searchKeyword, size: 8 },
          headers: { Authorization: `KakaoAK ${KAKAO_API_KEY}` },
        },
      );

      // kakaoData가 아니라 kakaoRes.data를 사용해야 함
      setResults(kakaoRes.data.documents || []);
    } catch (error) {
      console.error("검색 오류:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="recommend-container">
      <h1>📖 AI 맞춤 도서 추천</h1>

      <section className="recommend-section">
        <h3>📜 내 독서 히스토리 분석</h3>
        {booksList && booksList.length > 0 ? (
          <>
            <p className="recommend-reason">✨ {historyReason}</p>
            <div className="book-scroll-grid">
              {historyResults.map((book, idx) => (
                <div key={idx} className="book-card">
                  <Link to={`/book?isbn=${book.isbn}`}>
                    <img
                      src={
                        book.thumbnail || "https://via.placeholder.com/120x174"
                      }
                      alt={book.title}
                    />
                    <p className="book-title-short">{book.title}</p>
                  </Link>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="empty-msg">
            서재에 책을 담으면 취향 분석이 시작됩니다!
          </p>
        )}
      </section>

      <hr />

      <section className="recommend-section">
        <h3>💡 요즘 어떤 고민이 있으신가요?</h3>
        <p>고민을 분석하여 해결에 도움을 줄 책을 찾아드립니다.</p>
        <form onSubmit={handleSmartSearch} className="search-form">
          <textarea
            rows="2"
            placeholder="예: 인간관계 때문에 너무 스트레스 받아요."
            value={userWorry}
            onChange={(e) => setUserWorry(e.target.value)}
          />
          <button type="submit" disabled={isSearching}>
            {isSearching ? "분석 중..." : "AI 추천받기"}
          </button>
        </form>

        {aiKeyword && (
          <div className="ai-tag">
            <span>#{aiKeyword}</span>
          </div>
        )}

        <div className="book-result-grid">
          {results.map((book, idx) => (
            <div key={idx} className="book-item">
              <Link to={`/book?isbn=${book.isbn}`}>
                <img
                  src={book.thumbnail || "https://via.placeholder.com/150x210"}
                  alt={book.title}
                />
                <div className="book-info">{book.title}</div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Recommend;
