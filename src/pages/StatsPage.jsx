import React, { useState } from "react";
import BookCalendar from "../components/BookCalendar";
import useStore from "./Store/store";

const StatsPage = () => {
  const { booksList } = useStore();
  // 날짜가 기입된 책
  const calendarBooks = booksList.filter((book) => book.readDate !== "");
  // 다 읽은 책
  const readBooks = booksList.filter((book) => book.status === "읽은 책");
  const totalRead = readBooks.length;

  // 현재 읽는 중인 책
  const onReadingBooks = booksList.filter(
    (book) => book.status === "읽고 있는 책",
  );
  // 내가 평가한 책(추후 수정)
  const ratedBook = booksList.filter((book) => book.rating !== 0);

  const [selectedMonth, setSelectedMonth] = useState("");
  const monthlyBooks = booksList.filter(
    (book) => book.readDate === selectedMonth,
  );

  return (
    <div>
      {/* 독서량 통계 */}
      <p>독서량 통계</p>
      <p>월별 독서량</p>
    </div>
  );
};

export default StatsPage;
