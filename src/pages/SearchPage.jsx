import React, { useCallback, useEffect, useState } from "react";
import SearchHeader from "../components/SearchHeader";
import { useLocation } from "react-router-dom";
import BookModal from "../components/BookModal";
import useModalStore from "./Store/modal";

const SearchPage = () => {
  const location = useLocation();

  const bookList = location.state;

  const [selectedBook, setSelectedBook] = useState({ isbn: "" });

  const { isOpen, openModal, closeModal } = useModalStore();

  const preventScroll = useCallback((e) => {
    if (e.target.closest(".scrollAllow")) return;
    e.preventDefault();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener("wheel", preventScroll, { passive: false });
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("wheel", preventScroll);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, preventScroll]);

  return (
    <div>
      {/* 도서 상세페이지 팝업창 */}
      {isOpen && <BookModal header={selectedBook} />}
      {/* 검색 목록 */}
      <div className="book_list_container">
        {bookList ? (
          bookList.map((book, index) => (
            <article
              key={index}
              className="book_item"
              style={{
                display: "flex",
                borderBottom: "1px solid #ccc",
                padding: "20px 0",
              }}
            >
              <div className="book-img">
                <img
                  src={
                    book.thumbnail ||
                    "https://via.placeholder.com/120x170?text=No+Image"
                  }
                  alt={book.title}
                  style={{
                    width: "120px",
                    height: "170px",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div
                className="book-info"
                style={{ marginLeft: "20px", flex: 1 }}
              >
                <h2
                  className="book-title"
                  style={{ fontSize: "1.25rem", marginBottom: "10px" }}
                >
                  {book.title}
                </h2>

                <p
                  className="book-meta"
                  style={{ color: "#666", fontSize: "14px" }}
                >
                  <span>{book.authors.join(", ")} 저</span> |{" "}
                  <span>{book.publisher}</span> |{" "}
                  <span>{book.datetime.substring(0, 4)}년</span>
                </p>

                <p
                  className="book-description"
                  style={{
                    margin: "15px 0",
                    fontSize: "14px",
                    color: "#333",
                    lineHeight: "1.5",
                  }}
                >
                  {book.contents
                    ? `${book.contents.substring(0, 150)}...`
                    : "내용 요약이 없습니다."}
                </p>

                <div className="book-price" style={{ marginTop: "10px" }}>
                  <span
                    className="discount-price"
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    {book.sale_price > 0
                      ? `${book.sale_price.toLocaleString()}원`
                      : "가격 정보 없음"}
                  </span>
                  {book.price !== book.sale_price && (
                    <span
                      className="original-price"
                      style={{
                        textDecoration: "line-through",
                        marginLeft: "10px",
                        color: "#888",
                        fontSize: "14px",
                      }}
                    >
                      {book.price.toLocaleString()}원
                    </span>
                  )}
                </div>
              </div>

              <div className="book-action" style={{ alignSelf: "center" }}>
                <button
                  className="add-cart-btn"
                  style={{
                    padding: "10px 20px",
                    cursor: "pointer",
                    backgroundColor: "#333",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                  }}
                  onClick={() => {
                    openModal();
                    setSelectedBook(book);
                  }}
                >
                  도서 상세페이지
                </button>
              </div>
            </article>
          ))
        ) : (
          <div
            style={{ padding: "100px 0", textAlign: "center", color: "#999" }}
          >
            검색 결과가 없습니다. 다시 검색해 주세요.
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
