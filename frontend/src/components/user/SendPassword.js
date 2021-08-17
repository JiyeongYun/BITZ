import React from 'react';
import { Link } from 'react-router-dom';

function SendPassword(props) {
  return (
    <div className="sendpw">
      <div className="send__info">
        <p>
          <span>임시 비밀번호가 메일로 발송되었습니다.</span>
        </p>
        <p id="email">{props.email}</p>
      </div>
      <button>
        <Link to="/accounts/login">로그인 하기</Link>
      </button>
    </div>
  );
}

export default SendPassword;
