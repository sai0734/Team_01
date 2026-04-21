import React from "react";
import Calendar from "react-calendar";
import "./BookCalendar.scss";

const BookCalendar = () => {
  return (
    <div>
      <Calendar calendarType="gregory" />
    </div>
  );
};

export default BookCalendar;
