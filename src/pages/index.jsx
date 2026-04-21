import React from "react";
import MyLibrary from "./MyLibrary";
import Recommend from "./Recommend";

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>📚 독서 대시보드</h1>
        <p>오늘도 한 페이지 성장하세요</p>
      </header>

      <main className="home-main">
        {/* 서재 + 통계 */}
        <section className="section">
          <MyLibrary />
        </section>

        {/* 추천 */}
        <section className="section">
          <Recommend />
        </section>
      </main>
    </div>
  );
};

export default HomePage;