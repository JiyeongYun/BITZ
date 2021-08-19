import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import UserApi from "api/UserApi.js";
import { store } from "store/store.js"; // store import (store)

function Login({ history }) {
  // 전역 상태 관리 (store)
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const { userKind } = globalState.value;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch({ type: "SELECT_USER_KIND", value: "player" });
  }, [dispatch]);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }

    if (name === "userKind") {
      // userKind 전역 상태 관리 (store)
      dispatch({ type: "SELECT_USER_KIND", value });
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (email.length === 0 || password.length === 0) alert("입력하세요");
    let data = { email, password };

    if (userKind === "player") {
      UserApi.requestLogin(
        data,
        (res) => {
          localStorage.setItem("currentUser", JSON.stringify({ email }));
          dispatch({ type: "LOGIN", value: email });
          history.push("/");
        },
        (error) => {
          alert("아이디나 비밀번호를 확인해주세요.");
        }
      );
    } else if (userKind === "business") {
      UserApi.requestBusinessLogin(
        data,
        (res) => {
          localStorage.setItem("currentUserbusiness", JSON.stringify({ email }));
          dispatch({ type: "LOGIN", value: email });
          history.push("/");
        },
        (error) => {
          console.log(error);
          alert("아이디나 비밀번호를 확인해주세요.");
        }
      );
    }
  };

  return (
    <div className="loginForm">
      <p>농구에 미치고 싶다면?</p>
      <p>지금 바로 <span>BITZ</span>에 로그인하세요!</p>
      <form onSubmit={onSubmit}>
        {/* radio 버튼은 부트스트랩 필요할 듯 */}
        <div className="userKind">
          <label
            className={
              userKind === "player" ? "userKindRadio selected" : "userKindRadio unselected"
            }
          >
            <input type="radio" value="player" name="userKind" onClick={onChange} />
            <span>플레이어</span>
          </label>
          <label
            className={
              userKind === "business" ? "userKindRadio selected" : "userKindRadio unselected"
            }
          >
            <input type="radio" value="business" name="userKind" onClick={onChange} />
            <span>비즈니스</span>
          </label>
        </div>
        <div className="emailbox">
          <input type="email" onChange={onChange} name="email" placeholder="Email address" />
        </div>
        <div className="passwordbox">
          <input type="password" onChange={onChange} name="password" placeholder="Password"/>
        </div>
        <div className="userHelp">
          <Link to="/accounts/find_password">비밀번호 찾기</Link>
          <Link to="register">아직 계정이 없으신가요?</Link>
        </div>
        <button type="sumbit">로그인</button>
      </form>
    </div>
  );
}

export default Login;
