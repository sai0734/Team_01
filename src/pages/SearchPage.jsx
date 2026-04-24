import React, { useCallback, useEffect, useRef, useState } from "react";
import SearchHeader from "../components/SearchHeader";
import { useLocation, useSearchParams } from "react-router-dom";
import BookModal from "../components/BookModal";
import useModalStore from "./Store/modal";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import "./SearchPage.scss";

const SearchPage = () => {
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const search = searchParams.get("q") || "";

  // API를 통한 책 검색
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

  // react-query를 이용한 무한 스크롤 구현 함수
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

  // 모달창이 열렸을 때 외부 스크롤 방지
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
            <article key={index} className="book_item">
              <a href={book.url + "&tab=selling"} target="_blank">
                <div className="book-img">
                  <img
                    src={
                      book.thumbnail ||
                      "https://via.placeholder.com/120x170?text=No+Image"
                    }
                    alt={book.title}
                  />
                </div>
              </a>

              <a href={book.url + "&tab=selling"} target="_blank">
                <div className="book-info">
                  <h2 className="book-title">{book.title}</h2>

                  <p className="book-meta">
                    <span>{book.authors.join(", ")} 저</span> |{" "}
                    <span>{book.publisher}</span> |{" "}
                    <span>{book.datetime.substring(0, 4)}년</span>
                  </p>

                  <p className="book-description">
                    {book.contents
                      ? `${book.contents.substring(0, 150)}...`
                      : "내용 요약이 없습니다."}
                  </p>

                  <div className="book-price">
                    <span className="discount-price">
                      {book.sale_price > 0
                        ? `${book.sale_price.toLocaleString()}원`
                        : "가격 정보 없음"}
                    </span>
                    {book.price !== book.sale_price && (
                      <span className="original-price">
                        {book.price.toLocaleString()}원
                      </span>
                    )}
                  </div>
                </div>
              </a>

              <div className="book-action" style={{ alignSelf: "center" }}>
                {/* 모달창 열기 */}
                <button
                  className="add-cart-btn"
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
        {/* 페이지 하단에 도달했음을 감지하는 부분 */}
        <div ref={lastBookRef} style={{ height: 1 }} />
      </div>
    </div>
  );
};

export default SearchPage;
