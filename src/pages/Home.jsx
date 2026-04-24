import React from "react";
import { Link } from "react-router-dom";
import Recommend from "./recommend"; 
import Mylibrary from "./mylibrary";
import "./Home.scss"; 
import SearchHeader from "../components/SearchHeader";

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>맞춤형 독서 큐레이션</h1>
        <p>오늘도 한 페이지 성장하세요</p>
      </header>
        <SearchHeader />
      <main className="home-main">
        {/* 1. 상단 내비게이션 링크 */}

        {/* 2. 고민 기반 AI 도서 추천 섹션 */}
        <section className="section">
          {/* <h2 className="section-title">고민 해결 책 큐레이션</h2> */}
          <Recommend />
        </section>

        {/* 3. 읽고 있는 책들 (서재) 섹션
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">2. 현재 읽고 있는 책</h2>
            <Link to="/mypage" className="more-link">내 서재 가기 →</Link>
          </div>
          <Mylibrary />
        </section> */}
      </main>
    </div>
  );
};

export default Home;