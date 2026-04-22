import React, { useMemo } from "react";
import { useSelector } from "react-redux";

const MyLibrary = () => {
  // const books = useSelector((state) => state.books.list);
  // const stats = useMemo(() => {
  //   const total = books.length;
  //   const finished = books.filter((b) => b.status === "finished").length;
  //   const reading = books.filter((b) => b.status === "reading").length;
  //   const avgRating =
  //     total > 0
  //       ? (
  //           books.reduce((acc, cur) => acc + (cur.rating || 0), 0) / total
  //         ).toFixed(1)
  //       : 0;
  //   return { total, finished, reading, avgRating };
  // }, [books]);
  // return (
  //   <div className="library">
  //     <h2>📚 내 서재</h2>
  //     {/* 📊 통계 카드 */}
  //     <div className="stats-grid">
  //       <div className="stat-card">
  //         <p>전체</p>
  //         <h3>{stats.total}</h3>
  //       </div>
  //       <div className="stat-card">
  //         <p>읽는 중</p>
  //         <h3>{stats.reading}</h3>
  //       </div>
  //       <div className="stat-card">
  //         <p>완독</p>
  //         <h3>{stats.finished}</h3>
  //       </div>
  //       <div className="stat-card">
  //         <p>평균 평점</p>
  //         <h3>⭐ {stats.avgRating}</h3>
  //       </div>
  //     </div>
  //     {/* 📚 책 리스트 */}
  //     {books.length === 0 ? (
  //       <div className="empty">아직 등록된 책이 없습니다 📭</div>
  //     ) : (
  //       <div className="book-scroll">
  //         {books.map((book) => (
  //           <div key={book.id} className="book-card">
  //             <img src={book.thumbnail} alt={book.title} />
  //             <p className="title">{book.title}</p>
  //           </div>
  //         ))}
  //       </div>
  //     )}
  //   </div>
  // );
  return <div>library</div>;
};

export default MyLibrary;
