import React, { useState } from 'react'
import './FindPassword.css'
import WriteEmail from 'components/user/WriteEmail'
import SendPassword from 'components/user/SendPassword'

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
          setIsSend={() => setIsSend(true)}
        />
      </div>
    )
  }
}

export default FindPassword