import React, { Children, useRef, useState } from "react";
import "./BookModal.scss";
import BookDetailPage from "../pages/BookDetailPage/BookDetailPage";
import useModalStore from "../pages/Store/modal";

const BookModal = ({ header }) => {
  const { isOpen, openModal, closeModal } = useModalStore();

  // section을 조작하기 위해 useRef 사용
  const scroll = useRef(null);

  return (
    <div className={isOpen ? "openModal modal" : "modal"}>
      {isOpen ? (
        <section className="scrollAllow" ref={scroll}>
          <div className="modalHeader">
            <button className="modalClose" onClick={closeModal}>
              X
            </button>
          </div>
          <BookDetailPage header={header.isbn} scrollRef={scroll} />
        </section>
      ) : null}
    </div>
  );
};

export default BookModal;
