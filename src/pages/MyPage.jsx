import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const MyPage = () => {
  return (
    <>
      <div>MyPage</div>
      <ul>
        <li>
          최근에 읽은 책<Link to="/book">책 상세 페이지</Link>
        </li>
        <li>읽을 예정인 책</li>
        <li>읽는 중인 책</li>
      </ul>
      <NavLink to="/mypage/statistics">내 독서 통계</NavLink>
      <Outlet />
    </>
  );
};

export default MyPage;
