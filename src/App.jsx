import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Header = lazy(() => import("./components/Header"));
const Home = lazy(() => import("./pages/Home"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const StatsPage = lazy(() => import("./pages/StatsPage"));
const MyPage = lazy(() => import("./pages/MyPage"));
// const Profile = lazy(() => import("./pages"));
// const Library = lazy(() => import("./pages"));
const Books = lazy(() => import("./pages/Books"));
const Book = lazy(() => import("./pages/BookDetailPage"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  return (
    <Suspense fallback={<div style={{ padding: 16 }}>로딩 중...</div>}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/mypage" element={<MyPage />}>
          {/* <Route path="profile" element={<Profile />} />
          <Route path="library" element={<Library />} /> */}
          <Route path="statistics" element={<StatsPage />} />
        </Route>
        <Route path="/books" element={<Books />}>
          <Route path=":id" element={<Book />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
