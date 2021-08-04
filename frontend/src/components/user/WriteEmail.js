import React from 'react'
import './WriteEmail.css'

function SendPassword(props) {

  return (
    <div className="sendpw">
      <div className="email__info">
        <p>이메일</p>
        <input type="text" onChange={event => {
          props.setEmail(event.target.value)}}/>
      </div>
      <button onClick={props.setIsSend}>임시 비밀번호 발급</button>
    </div>
  )
}

export default SendPassword