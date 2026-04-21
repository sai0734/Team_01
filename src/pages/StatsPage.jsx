import React from "react";
import BookCalendar from "../components/BookCalendar";

const StatsPage = () => {
  return (
    <div>
      {/* 독서 캘린더 */}
      <div>
        <BookCalendar />
      </div>
      {/* 독서량 통계 */}
      <div>독서량 통계</div>
    </div>
  );
};

export default StatsPage;
