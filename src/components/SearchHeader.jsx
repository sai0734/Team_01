import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchHeader = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const onClick = async () => {
    try {
      const KakaoKey = "KakaoAK " + "895559b4f45cd858c4fcd679aa17c38b";
      const result = await axios.get("https://dapi.kakao.com/v3/search/book", {
        params: { query: input, sort: "accuracy", page: 1, size: 100 },
        headers: { Authorization: KakaoKey },
      });
      navigate("/search", {
        replace: true,
        state: result.data.documents,
      });
    } catch (e) {
      console.log("오류발생", e);
    }
  };

  return (
    <div>
      {/* 상단 검색 영역 */}
      <div>
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
  );
};

export default SearchHeader;
