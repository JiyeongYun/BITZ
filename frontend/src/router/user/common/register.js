import React, { useState } from "react";
import RegisterGeneral from "../player/RegisterGeneral.js"
import RegisterBusiness from "../business/RegisterBusiness.js"
import "./Register.css"

function Register() {
  const [isBusiness, setIsBusiness] = useState(false)
  const change_to_business = () => {
    setIsBusiness(true)
  }

  if (isBusiness) {
    return (
      <div>
        <RegisterBusiness />
      </div>
    )
  } else {
    return(
      <div>
        <RegisterGeneral />
        <div className="change_to_business">
          <div>체육관 소유주이신가요?</div>
          <button className="registerForm__button change_to_business__button" onClick={change_to_business}>비즈니스 계정 회원가입</button>
        </div>
      </div>
    )
  }
}

export default Register