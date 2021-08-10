import React, { createContext, useReducer, useContext, useEffect } from "react";
import RegisterGeneral from "components/user/player/register/RegisterGeneral.js"
import RegisterBusiness from "components/user/business/register/RegisterBusiness.js"
import "./Register.css"
import { store } from 'store/store.js';

// Context-Reducer
const reducerSubmit = (state, action) => {
  switch (action.type) {
    case "SUBMIT":
      return {state: true, email: action.value}
    default:
      throw new Error("회원가입 실패")
  }
}
export const stateSubmitContext = createContext()
export const dispatchSubmitContext = createContext()

function Register(props) {
  const globalState = useContext(store);
  const dispatch_ = globalState.dispatch;
  const { userKind } = globalState.value;

  // userKind를 player 로 만들어주기 (css animation을 위해)
  useEffect(() => {
    dispatch_({ type: "SELECT_USER_KIND", value:"player"})
  }, [])

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    
    if (name === 'userKind') {
      // userKind 전역 상태 관리 (store)
      dispatch_({ type: "SELECT_USER_KIND", value })
    }
  };

  // useReducer(reducer, initialState)
  const [stateSubmit, dispatch] = useReducer(reducerSubmit, {state: false, email: ""})

  return (
    <dispatchSubmitContext.Provider value={dispatch}>
      <stateSubmitContext.Provider value={stateSubmit}>
        <div className="register__container">
          <p>농구에 미치고 싶다면?</p>
          <p><img src="/images/logo.png" alt="logo" />에 <span>가입</span>하라!</p>
          <br/>
          <br/>
          <div className="register__userKind">
            <label
              className={
                userKind === 'player' ? 'userKindRadio selected' : 'userKindRadio unselected'
              }
              >
              <input type="radio" value="player" name="userKind" onClick={onChange} />
              <span>플레이어</span>
            </label>
            <label
              className={
                userKind === 'business' ? 'userKindRadio selected' : 'userKindRadio unselected'
              }
              >
              <input type="radio" value="business" name="userKind" onClick={onChange} />
              <span>비즈니스</span>
            </label>
          </div>
          {userKind==='player' ? (
            <div>
              <RegisterGeneral history={props.history}/>
            </div>
            ):(
              <div>
                <RegisterBusiness history={props.history} />
            </div>
          )}
        </div>
    </stateSubmitContext.Provider>
  </dispatchSubmitContext.Provider>
  )};

export default Register
