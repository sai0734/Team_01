import React, { useCallback, useState } from "react";

const Login = () => {
  //   const [user, setUser] = useState([]);

  const user = {
    Id: { userName: "이젠아카데미", Pw: "1234", currentLoginState: false },
  };
  const [textId, setTextId] = useState("");
  const [textPw, setTextPw] = useState("");

  const onChangeId = useCallback((e) => {
    setTextId(e.target.value);
  }, []);

  const onChangePw = useCallback((e) => {
    setTextPw(e.target.value);
  }, []);

  const login = () => {
    if (textId === user.Id) {
      if (textPw === user.Id.Pw) {
        user.Id.currentLoginState = true;
      } else {
        alert("아이디 또는 비밀번호가 틀렸습니다");
      }
    } else {
      alert("아이디 또는 비밀번호가 틀렸습니다");
    }
  };

  return (
    <div>
      <div>
        <div>
          <input value={textId} onChange={onChangeId} />
          <input value={textPw} onChange={onChangePW} />
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
