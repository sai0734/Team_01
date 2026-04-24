import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const user = [
    {
      userName: "이젠아카데미",
      Id: "qwer",
      Pw: "1234",
      currentLoginState: false,
    },
  ];
  const [textId, setTextId] = useState("");
  const [textPw, setTextPw] = useState("");

  const onChangeId = useCallback((e) => {
    setTextId(e.target.value);
  }, []);

  const onChangePw = useCallback((e) => {
    setTextPw(e.target.value);
  }, []);

  const login = () => {
    const userId = user.find((u) => u.Id === textId);

    if (userId) {
      if (textPw === userId.Pw) {
        userId.currentLoginState = true;
        console.log("로그인 성공");
        navigate("/Home");
      } else {
        alert("아이디 또는 비밀번호가 틀렸습니다");
        setTextId("");
        setTextPw("");
      }
    } else {
      alert("아이디 또는 비밀번호가 틀렸습니다");
      setTextId("");
      setTextPw("");
    }
  };

  const go = () => {
    alert("회원가입 홈페이지로 이동...은 없습니다. (만들예정 아마도...)");
  };

  return (
    <div>
      <div>
        <h1>로그인 페이지</h1>
        <div>
          <input value={textId} onChange={onChangeId} />
          <input type="password" value={textPw} onChange={onChangePw} />
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
