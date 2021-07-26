import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function SendPassword(props) {
  return (
    <div className="sendpw">
      <div className="send__info">
        <p>임시 비밀번호가 이메일로 발송되었습니다</p>
        <p id="email">{props.email}</p>
        <p>로그인 후 꼭 비밀번호를 바꿔주세요.</p>
      </div>
      <button><Link to="/accounts/login">로그인하기</Link></button>
    </div>
  )
}

export default SendPassword