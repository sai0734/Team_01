import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Link to="/">
        <img src="./assets/hero.png" />
      </Link>
      <Link to="/mypage">
        <p>나의 서재</p>
      </Link>
    </div>
  );
};

export default Header;
