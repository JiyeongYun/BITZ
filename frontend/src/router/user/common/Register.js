import React, { createContext, useReducer, useState } from "react";
import RegisterGeneral from "components/user/player/register/RegisterGeneral.js"
import RegisterBusiness from "components/user/business/register/RegisterBusiness.js"
import RegisterComplete from "components/user/common/register/RegisterComplete.js"
import "./Register.css"

// Context-Reducer
const reducerSubmit = (state, action) => {
  switch (action.type) {
    case "SUBMIT":
      return {state:true}
    default:
      throw new Error("회원가입 실패")
  }
}
export const stateSubmitContext = createContext()
export const dispatchSubmitContext = createContext()

function Register() {
  // useReducer(reducer, initialState)
  const [stateSubmit, dispatch] = useReducer(reducerSubmit, {state: false})

  const [isBusiness, setIsBusiness] = useState(false)
  const change_to_business = () => {
    setIsBusiness(true)
  }

  return (
    <dispatchSubmitContext.Provider value={dispatch}>
      <stateSubmitContext.Provider value={stateSubmit.state}>
        {
          stateSubmit.state ? (
            <RegisterComplete />
          ):(
            <div>
              {isBusiness ? (
                <div>
                <RegisterBusiness />
                </div>
                ):(
                <div>
                <RegisterGeneral />
                <div className="change_to_business">
                <div>체육관 소유주이신가요?</div>
                <button className="registerForm__button change_to_business__button" onClick={change_to_business}>비즈니스 계정 회원가입</button>
                </div>
                </div>
              )}
            </div>
            )
          }
    </stateSubmitContext.Provider>
  </dispatchSubmitContext.Provider>
  )};

export default Register
