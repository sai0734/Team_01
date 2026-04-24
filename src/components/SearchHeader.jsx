import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchHeader = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/search?q=${input}`);
  };

  return (
    <div className="searchHeader">
      <input
        type="text"
        name="bookSearch"
        placeholder="책 제목, 저자, 검색..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && onClick()}
      />
      <button className="searchButton" type="button" onClick={onClick}>
        검색
      </button>
    </div>
  );
};

export default SearchHeader;
