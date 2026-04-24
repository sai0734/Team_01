import React, { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../Store/store";
import "./Login.scss";

const Login = () => {
  const navigate = useNavigate();
  const inputRef = useRef();

  const { users } = useStore();

  const [textId, setTextId] = useState("");
  const [textPw, setTextPw] = useState("");

  const onChangeId = useCallback((e) => {
    setTextId(e.target.value);
  }, []);

  const onChangePw = useCallback((e) => {
    setTextPw(e.target.value);
  }, []);

  const login = () => {
    const userId = users.find((u) => u.Id === textId);

    if (userId && textPw === userId.Pw) {
      userId.currentLoginState = true;
      console.log("로그인 성공");
      navigate("/Home");
    } else {
      alert("아이디 또는 비밀번호가 틀렸습니다.");
      setTextId("");
      setTextPw("");
      inputRef.current.focus();
    }
  };

  const go = () => {
    navigate("/membership");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">디지털 서재</h1>
        <p className="login-subtitle">나만의 독서 기록을 관리해보세요.</p>

        <div className="input-section">
          <div className="input-group">
            <label>아이디</label>
            <input
              placeholder="아이디를 입력하세요"
              ref={inputRef}
              value={textId}
              onChange={onChangeId}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  login();
                }
              }}
            />
          </div>
          <div className="input-group">
            <label>비밀번호</label>
            <input
              placeholder="비밀번호를 입력하세요"
              type="password"
              value={textPw}
              onChange={onChangePw}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  login();
                }
              }}
            />
          </div>
        </div>

        <div className="button-group">
          <button className="login-btn" onClick={login}>
            로그인
          </button>
          <div className="divider-text">또는</div>
          <button className="membership-btn" onClick={go}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
