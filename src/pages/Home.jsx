import React from "react";
import MyLibrary from "./MyLibrary";
import Recommend from "./Recommend";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>📚 독서 대시보드</h1>
        <p>오늘도 한 페이지 성장하세요</p>
      </header>

      <main className="home-main">
        {/* 추천 */}
        <section className="section">
          추천도서 섹션
          {/* <Recommend /> */}
        </section>
        {/* 서재 + 통계 */}
        <section className="section">
          <Link to="/mypage">마이페이지</Link>
          {/* <MyLibrary /> */}
        </section>
        {/* 로그인 */}
        <Link to="/login">로그인</Link>
        <section className="section">
          <Link to="/book">상세페이지</Link>
        </section>
      </main>
    </div>
  );
};

export default Home;
