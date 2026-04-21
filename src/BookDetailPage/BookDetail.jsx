import axios from "axios";
import React, { useEffect, useState } from "react";

const styles = {
  container: {
    padding: "20px",
    maxWidth: "1000px",
    margin: "0 auto",
    fontFamily: "'Pretendard', sans-serif",
  },
  loading: {
    padding: "100px 0",
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#666",
  },
  headerSection: {
    display: "flex",
    gap: "40px",
    marginBottom: "50px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  mainImg: {
    width: "260px",
    maxWidth: "100%",
    height: "auto",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    objectFit: "cover",
    alignSelf: "flex-start",
  },
  infoBox: {
    flex: "1 1 320px",
    minWidth: "300px",
  },
  title: {
    fontSize: "clamp(1.5rem, 5vw, 2.2rem)",
    fontWeight: "800",
    color: "#1a1a1a",
    margin: "0 0 15px 0",
    lineHeight: "1.2",
  },
  metaInfo: {
    color: "#666",
    fontSize: "1.05rem",
    lineHeight: "1.6",
    marginBottom: "10px",
  },
  divider: {
    height: "1px",
    backgroundColor: "#eee",
    margin: "25px 0",
  },
  contents: {
    lineHeight: "1.8",
    color: "#444",
    fontSize: "1.05rem",
    textAlign: "justify",
  },
  subTitle: {
    fontSize: "1.4rem",
    fontWeight: "700",
    borderLeft: "6px solid #000",
    paddingLeft: "15px",
    marginBottom: "30px",
  },
  bookGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
    gap: "20px",
  },
  gridItem: {
    textAlign: "center",
  },
  gridImg: {
    width: "100%",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    marginBottom: "10px",
    aspectRatio: "2/3",
    objectFit: "cover",
  },
  gridTitle: {
    fontSize: "13px",
    fontWeight: "600",
    lineHeight: "1.4",
    color: "#333",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  ratingSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "15px",
  },
  starContainer: {
    display: "flex",
    gap: "5px",
  },
  star: {
    fontSize: "1.5rem",
    cursor: "pointer",
    transition: "color 0.2s",
  },
  ratingText: {
    fontSize: "1rem",
    color: "#333",
    fontWeight: "600",
  },
  moreBtn: {
    background: "none",
    border: "none",
    color: "#007bff",
    cursor: "pointer",
    padding: "0 5px",
    fontWeight: "bold",
    fontSize: "0.95rem",
    textDecoration: "underline",
  },
};

const BookDetail = () => {
  // 책 상세페이지
  const [selectedBook, setSelectedBook] = useState(null); // 현재 책
  const [authorBooks, setAuthorBooks] = useState([]); // 작가의 다른 책들

  const key = "KakaoAK " + "895559b4f45cd858c4fcd679aa17c38b"; // API 키

  // 별점 5점
  const [rating, setRating] = useState(0);

  // 더 보기
  const [isExpanded, setIsExpanded] = useState(false);

  const bookdata01 = async () => {
    try {
      const response01 = await axios.get(
        "https://dapi.kakao.com/v3/search/book",
        {
          params: { query: "지옥", sort: "accuracy", page: 1, size: 1 },
          headers: { Authorization: key },
        },
      );
      const mainBook = response01.data.documents[0];
      setSelectedBook(mainBook); // selectedBook 책 데이터

      if (mainBook) {
        const response02 = await axios.get(
          "https://dapi.kakao.com/v3/search/book",
          {
            params: {
              query: mainBook.authors[0],
              sort: "accuracy",
              page: 1,
              size: 6,
            },
            headers: { Authorization: key },
          },
        );
        setAuthorBooks(response02.data.documents); // authorBooks 책을 쓴 작가 데이터
      }
    } catch (e) {
      console.log("에러가 났습니다." + e);
    }
  };

  useEffect(() => {
    bookdata01();
  }, []);

  // 아직 selectedBook에 데이터가 담기지 않아 로딩중...
  if (!selectedBook) {
    return <div style={styles.loading}>데이터를 불러오는 중입니다...</div>;
  }

  // 텍스트 자르기 로직
  const fullText = selectedBook.contents;
  const shortText = fullText.substring(0, 100);
  // 글자 수가 200자보다 많은지 확인
  const isLongText = fullText.length > 100;

  return (
    <div style={styles.container}>
      {/* 상단: 책 상세 정보 */}
      <section style={styles.headerSection}>
        <a href={selectedBook.url} target="_blank" rel="noopener noreferrer">
          <img
            src={selectedBook.thumbnail}
            alt="cover"
            style={styles.mainImg}
            title="클릭하면 상세 페이지로 연결됩니다."
          />
        </a>
        <div style={styles.infoBox}>
          <h1 style={styles.title}>{selectedBook.title}</h1>
          <p style={styles.metaInfo}>
            <strong>저자:</strong> {selectedBook.authors.join(", ")} |{" "}
            <strong>출판사:</strong> {selectedBook.publisher}
          </p>
          {/* 별점 */}
          <div style={styles.ratingSection}>
            <div style={styles.starContainer}>
              {[1, 2, 3, 4, 5].map((num) => (
                <span
                  key={num}
                  style={{
                    ...styles.star,
                    color: num <= rating ? "#FFD700" : "#ddd", // 채워진 별은 금색, 아니면 회색
                  }}
                  onClick={() => {
                    // 만약 현재 점수(rating)와 클릭한 별(num)이 같다면 0으로 초기화, 아니면 num으로 설정
                    if (rating === num) {
                      setRating(0);
                    } else {
                      setRating(num);
                    }
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <span style={styles.ratingText}>
              {rating > 0 ? `${rating}점` : "별점을 선택해주세요"}
            </span>
          </div>
          {/* 더 보기 */}
          <div style={styles.divider} />
          <p style={styles.contents}>
            {isExpanded || !isLongText ? fullText : shortText + "..."}
            {isLongText && (
              <button
                style={styles.moreBtn}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "접기" : "더보기"}
              </button>
            )}
          </p>
        </div>
      </section>

      {/* 중간: 작가의 다른 도서 */}
      <section>
        <h3 style={styles.subTitle}>이 작가의 다른 도서</h3>
        <div style={styles.bookGrid}>
          {authorBooks.map((book, idx) => (
            <div key={idx} style={styles.gridItem}>
              <a href={book.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={
                    book.thumbnail ||
                    "https://via.placeholder.com/120x174?text=No+Image"
                  }
                  alt={book.title}
                  style={styles.gridImg}
                />
              </a>
              <p style={styles.gridTitle}>{book.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BookDetail;
