import React, { Children, useState } from "react";
import "./BookModal.scss";
import BookDetailPage from "../pages/BookDetailPage/BookDetailPage";

const BookModal = ({ open, close, header }) => {
  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
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
