import React, { useState } from "react";
import useStore from "../Store/store";
import { Navigate, useNavigate } from "react-router-dom";

const Membership = () => {
  const { addMembership } = useStore();
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userName, setUserName] = useState("");

  return (
    <div>
      <input
        value={userId}
        placeholder="아이디를 입력하세요"
        onChange={(e) => {
          setUserId(e.target.value);
        }}
      />
      <input
        type={"password"}
        value={userPw}
        placeholder="비밀번호를 입력하세요"
        onChange={(e) => {
          setUserPw(e.target.value);
        }}
      />
      <input
        value={userName}
        placeholder="이름을 입력하세요"
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <button
        onClick={() => {
          addMembership(userId, userPw, userName);
          alert("회원가입이 완료되었습니다.");
          navigate("/");
        }}
      >
        회원가입
      </button>
    </div>
  );
};

export default Membership;
