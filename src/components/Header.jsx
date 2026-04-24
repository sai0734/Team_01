import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import homeIcon from "../assets/homeIcon.png";

const Header = () => {
  return (
    <div className="header">
      <Link to="/home">
        <div className="mainLogo">
          <img src={homeIcon} />
        </div>
      </Link>
      <Link to="/mypage">
        <p className="toLibrary">나의 서재</p>
      </Link>
    </div>
  );
};

export default Header;
