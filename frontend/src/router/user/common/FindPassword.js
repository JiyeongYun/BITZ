import React, { useState } from 'react'
import './FindPassword.css'
import WriteEmail from 'components/user/WriteEmail'
import SendPassword from 'components/user/SendPassword'
import UserApi from 'api/UserApi'

function FindPassword() {
  const [ email, setEmail ] = useState("")
  const [ isSend, setIsSend ] = useState(false)

  if (isSend) {
    return (
      <div className="findpw">
        <img src="/images/logo.png" alt="logo"></img>
        <SendPassword
          email={email}
        />
      </div>
    )
  } else {
    return (
      <div className="findpw">
        <img src="/images/logo.png" alt="logo"></img>
        <WriteEmail
          setEmail={e => setEmail(e)}
          setIsSend={() => {
            const data = {email: email}
            setIsSend(true)
            UserApi.findPwd(
              data,
              () => {
                alert("메일이 전송되었습니다!")
              },
              () => {
                setIsSend(false)
                alert("이메일을 확인해주세요!")
              }
            )
          }}
        />
      </div>
    )
  }
}

export default FindPassword