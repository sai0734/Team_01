import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BestSeller.scss"; // 별도 스타일링 추천

const BestSeller = () => {
  const [bestsellers, setBestsellers] = useState([]);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const KakaoKey = "KakaoAK " + "895559b4f45cd858c4fcd679aa17c38b";
        const response = await axios.get(
          "https://dapi.kakao.com/v3/search/book",
          {
            params: {
              query: "베스트셀러",
              sort: "accuracy",
              page: 1,
              size: 10,
            },
            headers: { Authorization: KakaoKey },
          },
        );
        setBestsellers(response.data.documents);
      } catch (e) {
        console.log("베스트셀러를 불러오지 못했습니다.", e);
      }
    };

    fetchBestSellers();
  }, []);

  return (
    <div className="bestseller-container">
      <h2>🔥 실시간 인기 도서</h2>
      <div className="bestseller-list">
        {bestsellers.map((book, index) => (
          <a
            key={index}
            href={book.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bestseller-item"
          >
            <img
              src={book.thumbnail || "https://via.placeholder.com/100x140"}
              alt={book.title}
            />
            <div className="book-info">
              <p className="title">{book.title}</p>
              <p className="author">{book.authors[0]}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
