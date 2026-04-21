import React from "react";
import { Outlet } from "react-router-dom";

const MyPage = () => {
  return (
    <>
      <div>MyPage</div>
      <Outlet />
    </>
  );
};

export default MyPage;
