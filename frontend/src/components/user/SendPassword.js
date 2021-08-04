import React from 'react'
import { Link } from 'react-router-dom'

function SendPassword(props) {
  return (
    <div className="sendpw">
      <div className="send__info">
        <p>아래의 주소로 메일을 보내는 중 입니다.(소요시간 : 1 ~ 2분)</p>
        <p id="email">{props.email}</p>
        <p>로그인 후 꼭 비밀번호를 바꿔주세요.</p>
      </div>
      <button><Link to="/accounts/login">로그인하기</Link></button>
    </div>
  )
}

export default SendPassword