import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Recommend = () => {
  const books = useSelector((state) => state.books.list);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!books.length) return;

    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/recommend", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            books: books.map((b) => ({
              title: b.title,
              genre: b.genre,
              rating: b.rating,
            })),
          }),
        });

        const data = await res.json();
        setRecommendations(data);
      } catch (e) {
        console.error(e);

        // fallback
        setRecommendations([
          { id: 1, title: "추천 도서 A", thumbnail: "" },
          { id: 2, title: "추천 도서 B", thumbnail: "" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [books]);

  return (
    <div className="recommend">
      <h2>🤖 AI 추천 도서</h2>

      {books.length === 0 && (
        <div className="empty">책을 추가하면 추천이 시작됩니다 📚</div>
      )}

      {loading && <div className="loading">추천 생성 중...</div>}

      <div className="recommend-grid">
        {recommendations.map((book) => (
          <div key={book.id} className="recommend-card">
            <img
              src={book.thumbnail || "https://via.placeholder.com/120"}
              alt={book.title}
            />
            <p>{book.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommend;