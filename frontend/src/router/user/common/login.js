import React, { useState } from 'react';
import './Login.css';
import { Link } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userKind, setUserKind] = useState('user');

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
    <div>
      <div className="loginForm">
        <img className="login__logo" src="/images/logo.png" alt="logo" />
        <form onSubmit={onSubmit}>
          {/* radio 버튼은 부트스트랩 필요할 듯 */}
          <label className="userKindRadio">
            <input type="radio" value="player" name="userKind" onChange={onChange} checked />
            플레이어
          </label>
          <label className="userKindRadio">
            <input type="radio" value="business" name="userKind" onChange={onChange} />
            비즈니스
          </label>
          <br />
          아이디
          <br />
          <input type="email" onChange={onChange} name="email" />
          <br />
          비밀번호
          <br />
          <input type="password" onChange={onChange} name="password" />
          <br />
          <div className="userHelp">
            <button><Link to="/accounts/find_password">비밀번호 찾기</Link></button>
            <Link to="register">아직 계정이 없으신가요?</Link>
          </div>
          <button type="sumbit">로그인</button>
        </form>
        <div className="snsLogin">
          <button onClick={onGoogleLogin}>구글 계정으로 로그인</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
