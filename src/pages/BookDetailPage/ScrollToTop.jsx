import React from "react";

const ScrollToTop = () => {
  const moveTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "5%",
        right: "2rem",
      }}
    >
      <button
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50px",
          border: "none",
          backgroundColor: "gray",
          cursor: "pointer",
        }}
        onClick={moveTop}
      >
        위로가기
      </button>
    </div>
  );
};

export default ScrollToTop;
