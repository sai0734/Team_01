import React, { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../Store/store";

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
      alert("아이디 또는 비밀번호가 틀렸습니다");
      setTextId("");
      setTextPw("");
      inputRef.current.focus();
    }
  };

  const go = () => {
    alert("회원가입 페이지로 이동합니다.");
    navigate("/membership");
  };

  return (
    <div>
      <div>
        <h1>로그인 페이지</h1>
        <div>
          <input
            placeholder="아이디를 입력하세요"
            ref={inputRef}
            value={textId}
            onChange={onChangeId}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                login();
              }
            }}
          />
          <input
            placeholder="비밀번호를 입력하세요"
            type="password"
            value={textPw}
            onChange={onChangePw}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                login();
              }
            }}
          />
        </div>
        <div>
          <button onClick={login}>로그인</button>
          <button onClick={go}>회원가입</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
