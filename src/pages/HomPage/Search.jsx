import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Search.scss";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const onClick = async () => {
    try {
      const KakaoKey = "KakaoAK " + "895559b4f45cd858c4fcd679aa17c38b";

      const response = await axios.get(
        "https://dapi.kakao.com/v3/search/book",
        {
          params: { query: input, sort: "accuracy", page: 1, size: 100 },
          headers: { Authorization: KakaoKey },
        },
      );

      navigate("/searchFilterpage", {
        state: { books: response.data.documents, key: input },
      });
    } catch (e) {
      console.log("불러오는 중 오류가 났습니다.", e);
    }
  };

  return (
    <div className="home-page">
      <div className="search-container">
        {/* 1. 서비스 로고 또는 타이틀 */}
        <div className="search-logo">
          <h1>KAKAO BOOK SEARCH</h1>
          <p>찾으시는 도서명을 입력해주세요.</p>
        </div>

        {/* 2. 검색 입력창 및 버튼 영역 */}
        <div className="search-form">
          <input
            type="text"
            name="bookSearch"
            placeholder="책 제목, 저자, 검색..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && onClick()}
          />
          <button type="button" onClick={onClick}>
            검색
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
