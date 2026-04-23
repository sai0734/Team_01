import React, { useState } from "react";
import './Recommend.scss';

const Recommend = () => {
  const [userWorry, setUserWorry] = useState(""); // 사용자 입력 고민
  const [results, setResults] = useState([]);     // 카카오 도서 결과
  const [isSearching, setIsSearching] = useState(false);
  const [aiKeyword, setAiKeyword] = useState(""); // AI가 추출한 키워드

  // API 키 설정
  const KAKAO_API_KEY = "895559b4f45cd858c4fcd679aa17c38b";
  // 구글 Gemini API 키를 아래에 입력하세요 (없을 경우 일반 검색으로 동작하도록 예외처리)
  const GEMINI_API_KEY = "AIzaSyDimUJfqFc0uIyE_vd0iQztG7AucPe3aE0"; 

  const handleSmartSearch = async (e) => {
    e.preventDefault();
    if (!userWorry.trim()) return;

    setIsSearching(true);
    setAiKeyword("AI가 고민을 분석 중입니다...");

    try {
      let searchKeyword = userWorry;

      // STEP 1: Google Gemini AI를 통한 키워드 정제
      // 사용자의 푸념에서 도서 검색에 가장 적합한 '단어'를 추출합니다..
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `사용자의 고민: "${userWorry}"\n이 고민을 해결할 수 있는 책을 검색하기 위한 핵심 단어 딱 하나만 출력해줘.`
                }]
              }]
            })
          }
        );
        const geminiData = await geminiRes.json();
        if (geminiData.candidates) {
          searchKeyword = geminiData.candidates[0].content.parts[0].text.trim();
        }
      } catch (aiError) {
        console.error("AI 분석 실패, 일반 검색으로 전환:", aiError);
      }

      setAiKeyword(searchKeyword);

      // STEP 2: Kakao 도서 API 호출
      const kakaoRes = await fetch(
        `https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(searchKeyword)}&size=8`,
        {
          headers: { Authorization: `KakaoAK ${KAKAO_API_KEY}` },
        }
      );
      const kakaoData = await kakaoRes.json();
      setResults(kakaoData.documents || []);

    } catch (error) {
      console.error("검색 프로세스 오류:", error);
      alert("도서를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setIsSearching(false);
    }
  };


  return (
    <div>
      <h1 >📖 AI 맞춤 도서 추천</h1>

      {/* 1. 히스토리 기반 추천 (버튼만 유지) 111*/}
      <section >
        <h3 >📜 내 독서 히스토리 분석</h3>
        <p >기존에 저장하거나 검색한 데이터를 바탕으로 취향을 분석합니다.</p>
        <button >
          레포지토리 데이터 연계 준비 중...
        </button>
      </section>

      {/* 2. 고민 기반 AI 추천 (Google AI + Kakao API) */}
      <section >
        <h3 >💡 요즘 어떤 고민이 있으신가요?</h3>
        <p >AI가 고민을 분석하여 해결에 도움을 줄 책을 찾아드립니다.</p>
        <form onSubmit={handleSmartSearch} >
          <textarea
            
            rows="2"
            placeholder="예: 요즘 번아웃이 온 것 같아 무기력해요."
            value={userWorry}
            onChange={(e) => setUserWorry(e.target.value)}
          />
          <button type="submit" disabled={isSearching}>
            {isSearching ? "분석 중..." : "AI 추천"}
          </button>
        </form>

        {aiKeyword && (
          <div >
            AI 분석 키워드: #{aiKeyword}
          </div>
        )}

        <div >
          {results.map((book, idx) => (
            <div key={idx} >
              <img 
                src={book.thumbnail || "https://via.placeholder.com/160x230?text=No+Image"} 
                alt={book.title}  
              />
              <div>{book.title}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Recommend;