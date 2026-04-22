import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import SearchHeader from "./components/SearchHeader";

const Home = lazy(() => import("./pages/Home"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const StatsPage = lazy(() => import("./pages/StatsPage"));
const MyPage = lazy(() => import("./pages/MyPage/MyPage"));
// const Profile = lazy(() => import("./pages"));
// const Library = lazy(() => import("./pages"));
// const Books = lazy(() => import("./pages/Books"));
const Book = lazy(() => import("./pages/BookDetailPage/BookDetailPage"));
const Login = lazy(() => import("./pages/Login"));
const Recommend = lazy(() => import("./pages/Recommend"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  return (
    <Suspense fallback={<div style={{ padding: 16 }}>로딩 중...</div>}>
      <Header />
      <SearchHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/mypage" element={<MyPage />}>
          {/* <Route path="profile" element={<Profile />} />
          <Route path="library" element={<Library />} /> */}
          <Route path="statistics" element={<StatsPage />} />
        </Route>
        <Route path="/book" element={<Book />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
