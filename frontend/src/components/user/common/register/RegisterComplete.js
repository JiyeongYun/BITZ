import React, { useContext } from "react";
import { stateSubmitContext } from "router/user/common/Register";

function RegisterComplete() {
  // Context
  const { email } = useContext( stateSubmitContext )

  return(
    <div className="registerComplete">
      <div>
        <img className="registerComplete__logo" src="/images/logo.png" alt="logo" />
      </div>
      <div className="registerComplete__comments">
        <div>인증 메일이 발송되었습니다!</div>
        <div className="registerComplete__email">{ email }</div>
        <div>이메일 인증을 완료하시면 서비스 사용이 가능합니다.</div>
        <div className="registerComplete__excuse">인증 메일 발송에 1~2분이 소요될 수 있습니다.</div>
      </div>
    </div>
  )
}

export default RegisterComplete