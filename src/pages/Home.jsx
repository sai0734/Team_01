import React from "react";
import { Link } from "react-router-dom";
import Recommend from "./recommend"; 
import Mylibrary from "./mylibrary";
import "./Home.scss"; 

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>맞춤형 독서 큐레이션</h1>
        <p>오늘도 한 페이지 성장하세요</p>
      </header>

      <main className="home-main">
        {/* 1. 상단 내비게이션 링크 */}
        <nav className="home-nav">
          <Link to="/mypage">나의 서재 가기</Link>
          {/* 폴더 구조상 상세페이지 경로는 /BookDetailPage 등이 될 수 있습니다. */}
          <Link to="/book-detail">도서 상세페이지</Link> 
        </nav>

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