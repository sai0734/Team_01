import React, { useMemo, useState } from "react";
import Calendar from "react-calendar";
import "./BookCalendar.scss";
import useStore from "../pages/Store/store";
import StatsPage from "../pages/StatsPage";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const BookCalendar = () => {
  const { booksList } = useStore();

  const today = new Date();

  // 지난 30일간 읽은 책 리스트
  const last30Days = booksList.filter((book) => {
    const readDate = new Date(book.readDate);
    const diff = (today - readDate) / (1000 * 60 * 60 * 24);
    return diff <= 30;
  });
  const last30Count = last30Days.length;

  // 월별 독서량 통계
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  const monthlyStats = booksList.reduce((acc, book) => {
    if (book.readDate == "") return acc;

    const date = new Date(book.readDate);
    if (date.getFullYear() !== selectedYear) return acc;

    const month = date.getMonth() + 1;
    acc[month] = (acc[month] || 0) + 1;

    return acc;
  }, {});

  const bookChartData = Array.from({ length: 12 }, (_, i) => ({
    month: `${i + 1}월`,
    count: monthlyStats[i + 1] || 0,
  }));

  const currentYear = today.getFullYear();
  const years = useMemo(() => {
    return [
      ...new Set([
        currentYear,
        ...booksList
          .filter((b) => b.readDate)
          .map((b) => new Date(b.readDate).getFullYear()),
      ]),
    ].sort((a, b) => b - a);
  }, [booksList]);

  // 내 평점
  const ratedBook = booksList.filter((book) => typeof book.rating == "number");
  const averageRating =
    Math.round(
      (ratedBook.reduce((sum, book) => sum + book.rating, 0) * 100) /
        ratedBook.length,
    ) / 100;

  // 별점 분포
  const ratingStats = booksList.reduce((acc, book) => {
    if (typeof book.rating !== "number") return acc;

    const rating = book.rating;

    acc[rating] = (acc[rating] || 0) + 1;

    return acc;
  }, {});

  const ratingChartData = [1, 2, 3, 4, 5].map((star) => ({
    rating: `${star}점`,
    count: ratingStats[star] || 0,
  }));

  const calendarBooks = booksList.filter((book) => book.readDate !== "");

  // 달력에 사진 추가
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
      <div>지난 30일 독서량: {last30Count}권</div>
      <div className="selectWrap">
        <select
          id="yearSelection"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}년
            </option>
          ))}
        </select>
        <label htmlFor="yearSelection">년 월별 통계</label>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={bookChartData}>
          <XAxis dataKey="month" />
          <YAxis domain={[0, (dataMax) => dataMax * 1.2]} />
          <Tooltip />
          <Bar dataKey="count" fill="red" />
        </BarChart>
      </ResponsiveContainer>
      <div>내 평점 평균: {averageRating}점</div>
      <p>내 별점 분포</p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={ratingChartData}>
          <XAxis dataKey="rating" padding={{ left: 40, right: 40 }} />
          <YAxis domain={[0, (dataMax) => dataMax * 1.2]} />
          <Tooltip />
          <Line dataKey="count" stroke="red" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BookCalendar;
