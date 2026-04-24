import React, { useState } from "react";
import useStore from "../Store/store";
import { Navigate, useNavigate } from "react-router-dom";
import "./Membership.scss";

const Membership = () => {
  const navigate = useNavigate();
  const { addMembership, users } = useStore();
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userName, setUserName] = useState("");

  const add = () => {
    if (!userId || !userPw || !userName) {
      alert("정보를 모두 입력해주세요.");
      return false;
    }
    const isExist = users.some((user) => user.Id === userId);
    if (isExist) {
      alert("중복된 아이디 입니다.");
      setUserId("");
      return false;
    }
    addMembership(userId, userPw, userName);
    return true;
  };

  return (
    <div className="membership-container">
      <div className="membership-box">
        <h1 className="membership-title">회원가입</h1>
        <p className="membership-subtitle">새로운 독서 여정을 시작해보세요.</p>

        <div className="input-section">
          <div className="input-group">
            <label>아이디</label>
            <input
              value={userId}
              placeholder="아이디를 입력하세요"
              onChange={(e) => {
                setUserId(e.target.value);
              }}
            />
          </div>

          <div className="input-group">
            <label>비밀번호</label>
            <input
              type={"password"}
              value={userPw}
              placeholder="비밀번호를 입력하세요"
              onChange={(e) => {
                setUserPw(e.target.value);
              }}
            />
          </div>

          <div className="input-group">
            <label>이름</label>
            <input
              value={userName}
              placeholder="이름을 입력하세요"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="button-group">
          <button
            className="signup-btn"
            onClick={() => {
              if (add()) {
                alert("회원가입이 완료되었습니다.");
                navigate("/");
              }
            }}
          >
            회원가입
          </button>
          <button className="back-btn" onClick={() => navigate("/")}>
            취소 및 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Membership;
