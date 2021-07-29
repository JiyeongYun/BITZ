import React, { useContext, useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import UserApi from 'api/UserApi.js';
import { store } from 'store/store.js'; // store import (store)

function Login({ history, changeUserObj }) {
  // 전역 상태 관리 (store)
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const { userKind } = globalState.value;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }

    if (name === 'userKind') {
      // userKind 전역 상태 관리 (store)
      dispatch({ type: "SELECT_USER_KIND", value })
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (email.length === 0 || password.length === 0) alert('입력하세요');
    let data = { email, password };

    if (userKind === 'player') {
      UserApi.requestLogin(
        data,
        (res) => {
          // alert(res);
          const { data } = res; // 유저 정보
          localStorage.setItem('currentUser', JSON.stringify(data));
          changeUserObj(data);
        },
        (error) => {
          alert(error);
          alert('아이디나 비밀번호를 확인해주세요.');
        }
      );
    }
  };

  const onGoogleLogin = () => {
    alert('구글 계정으로 로그인');
  };

  return (
    <div className="loginForm">
      <img className="login__logo" src="/images/logo.png" alt="logo" />
      <form onSubmit={onSubmit}>
        {/* radio 버튼은 부트스트랩 필요할 듯 */}
        <div className="userKind">
          <label
            className={
              userKind === 'player' ? 'userKindRadio selected' : 'userKindRadio unselected'
            }
          >
            <input type="radio" value="player" name="userKind" onClick={onChange} />
            <span>플레이어</span>
          </label>
          <label
            className={
              userKind === 'business' ? 'userKindRadio selected' : 'userKindRadio unselected'
            }
          >
            <input type="radio" value="business" name="userKind" onClick={onChange} />
            <span>비즈니스</span>
          </label>
        </div>
        <div className="emailbox">
          이메일
          <br />
          <input type="email" onChange={onChange} name="email" />
        </div>
        <div className="passwordbox">
          비밀번호
          <br />
          <input type="password" onChange={onChange} name="password" />
        </div>
        <div className="userHelp">
          <Link to="/accounts/find_password">비밀번호 찾기</Link>
          <Link to="register">아직 계정이 없으신가요?</Link>
        </div>
        <button type="sumbit">로그인</button>
      </form>
      <button className="googleLogin">
        <img src="/images/google_logo.png" alt="sns_logo" id="google__logo" />
        <span>구글 계정으로 로그인</span>
      </button>
    </div>
  );
}

export default Login;
