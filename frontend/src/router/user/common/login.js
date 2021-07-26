import React, { useState } from 'react';
import './Login.css';
import { Link } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userKind, setUserKind] = useState('player');

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
      setUserKind(value);
    }
  };

  const onSubmit = () => {
    if (email.length === 0 || password.length === 0) alert('입력하세요');
    alert('eamil : ' + email + ' password : ' + password + ' userKind : ' + userKind);
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
          <label className={userKind==='player' ? 'userKindRadio' : 'userKindRadio unselected'}>
            <input type="radio" value="player" name="userKind" onClick={onChange} />
            플레이어
          </label>
          <label className={userKind==='business' ? 'userKindRadio' : 'userKindRadio unselected'}>
            <input type="radio" value="business" name="userKind" onClick={onChange} />
            비즈니스
          </label>
        </div>
        <div className="emailbox">
          이메일
          <br/>
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
      <button className="snsLogin">
        <img src="/images/google_logo.png" alt="sns_logo" id="google__logo"/>
        <span>구글 계정으로 로그인</span>
      </button>
    </div>
  );
}

export default Login;
