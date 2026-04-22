import React from "react";
import Calendar from "react-calendar";
import "./BookCalendar.scss";

const BookCalendar = () => {
  const tileContent = ({ date }) => {
    return <div>img</div>;
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
