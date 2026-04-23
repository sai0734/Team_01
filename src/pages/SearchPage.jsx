import React, { useCallback, useEffect, useRef, useState } from "react";
import SearchHeader from "../components/SearchHeader";
import { useLocation, useSearchParams } from "react-router-dom";
import BookModal from "../components/BookModal";
import useModalStore from "./Store/modal";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const SearchPage = () => {
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const search = searchParams.get("q") || "";

  const fetchBooks = async ({ pageParams = 1, queryKey }) => {
    const [, search] = queryKey;

    const res = await axios.get("https://dapi.kakao.com/v3/search/book", {
      params: { query: search, sort: "accuracy", page: pageParams, size: 10 },
      headers: { Authorization: "KakaoAK 895559b4f45cd858c4fcd679aa17c38b" },
    });

    const data = res.data;

    return {
      books: data.documents,
      isLast: data.meta.is_end,
    };
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["books", search],
      queryFn: fetchBooks,
      enabled: !!search,

      getNextPageParam: (lastPage, pages) => {
        return lastPage.isLast ? undefined : pages.length + 1;
      },
    });

  const bookList = data?.pages?.flatMap((page) => page.books) || [];

  const observerRef = useRef(null);

  const lastBookRef = useCallback(
    (node) => {
      if (!node) return;
      if (!hasNextPage) return;
      if (isFetchingNextPage) return;

      observerRef.current?.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      });

      observerRef.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

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
        {bookList.map((book, index) => {
          const isLast = index === bookList.length - 1;

          return (
            <article
              key={index}
              className="book_item"
              style={{
                display: "flex",
                borderBottom: "1px solid #ccc",
                padding: "20px 0",
              }}
            >
              <a href={book.url}>
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
              </a>

              <a href={book.url}>
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
              </a>

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
          );
        })}

        <div ref={lastBookRef} style={{ height: 1 }} />
      </div>
    </div>
  );
};

export default SearchPage;
