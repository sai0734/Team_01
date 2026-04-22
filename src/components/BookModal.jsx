import React, { Children, useState } from "react";
import "./BookModal.scss";
import BookDetailPage from "../pages/BookDetailPage/BookDetailPage";
import useModalStore from "../pages/Store/modal";

const BookModal = ({ header }) => {
  const { isOpen, openModal, closeModal } = useModalStore();

  return (
    <div className={isOpen ? "openModal modal" : "modal"}>
      {isOpen ? (
        <section className="scrollAllow">
          <div className="modalHeader">
            <button className="modalClose" onClick={closeModal}>
              X
            </button>
          </div>
          <BookDetailPage header={header.isbn} />
        </section>
      ) : null}
    </div>
  );
};

export default BookModal;
