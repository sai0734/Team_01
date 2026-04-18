import React from "react";
import { Link, Outlet } from "react-router-dom";

const Header = () => {
  return (
    <div className="layout">
      <header
        className="header"
        style={{
          height: "150px",
          width: "100%",
          borderBottom: "1px solid #bdbdbd",
        }}
      >
        <div
          className="header-content"
          style={{
            padding: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>BOOK STORE</h1>
          <nav>
            <ul style={{ display: "flex", listStyle: "none", gap: "30px" }}>
              <li>
                <Link to="/">홈으로</Link>
              </li>
              <li>
                <Link to="/searchFilterpage">도서검색</Link>
              </li>
              <li>
                <Link to="/mypage">마이페이지</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Header;
