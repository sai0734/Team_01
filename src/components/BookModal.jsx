import React, { Children, useState } from "react";
import "./BookModal.scss";
import BookDetailPage from "../pages/BookDetailPage/BookDetailPage";

const BookModal = ({ isModalOpen, close, header }) => {
  return (
    <div className={isModalOpen ? "openModal modal" : "modal"}>
      {isModalOpen ? (
        <section className="scrollAllow">
          <div className="modalHeader">
            <button className="modalClose" onClick={close}>
              X
            </button>
          </div>
          <BookDetailPage header={header} />
        </section>
      ) : null}
    </div>
  );
};

export default BookModal;
