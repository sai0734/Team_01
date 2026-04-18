import React from "react";
import HomePage from "./pages/HomPage/HomePage";
import SearchFilterPage from "./pages/SearchFilterPage/SearchFilterPage";
import BookDetailPage from "./pages/BookDetailPage/BookDetailPage";
import MyPage from "./pages/MyPage/MyPage";
import { Outlet, Route, Routes } from "react-router-dom";
import Header from "./component/Layout/header";

function App() {
  return (
    <Routes>
      <Route element={<Header />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/searchFilterpage" element={<SearchFilterPage />} />
        <Route path="/booldetailpage" element={<BookDetailPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Route>
    </Routes>
  );
}

export default App;
