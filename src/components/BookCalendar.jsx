import React from "react";
import Calendar from "react-calendar";
import "./BookCalendar.scss";
import useStore from "../pages/Store/store";

const BookCalendar = () => {
  const { booksList } = useStore();
  const calendarBooks = booksList.filter((book) => book.readDate !== "");

  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;

    const book = calendarBooks.find((item) => {
      const d = new Date(item.readDate);

      return (
        d.getFullYear() === date.getFullYear() &&
        d.getMonth() === date.getMonth() &&
        d.getDate() === date.getDate()
      );
    });

    if (!book) return null;

    return (
      <img
        src={book.thumbnail}
        alt="https://via.placeholder.com/120x170?text=No+Image"
      />
    );
  };
  return (
    <div>
      <Calendar
        calendarType="gregory"
        formatDay={(locale, date) => date.getDate()}
        tileContent={tileContent}
      />
    </div>
  );
};

export default BookCalendar;
