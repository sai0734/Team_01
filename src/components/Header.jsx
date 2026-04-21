import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Link to="/">
        <img src="./assets/hero.png" />
      </Link>
    </div>
  );
};

export default Header;
