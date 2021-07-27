// !!!!!미완성!!!!!미완성!!!!!미완성!!!!!미완성!!!!!미완성!!!!!미완성!!!!!미완성!!!!!미완성!!!!!미완성!!!!!
import { createContext, useReducer } from "react";
// State (명시적 선언 ; 정의 용도) - (0)
// PJW - Authentication & Authorization 용 State 초기값 정의
 const gameStateInit = {
   gameList: [] // id, 시간, 체육관 이름, 주소, 코트규격, 최소 인원, 최대 인원, 편의시설
 };

// Reducer (Vuex 기준 Mutation & Actions) - (1)
// PJW - Authentication & Authorization 용 Reducer 생성
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {...state, isLoggedIn: true}
    default:
      throw new Error("Error")
  }
};

// Context (State, Dispatch의 실질적 선언) - (2)
// PJW - Authentication & Authorization 용 Context (State, Dispatch) 생성
export const authStateContext = createContext();
export const authDispatchContext = createContext();

export default function gameContext ({ children }) {
  // useReducer (Provider에 넣어 하위 컴포넌트와 Context 연동) - (3)
  // PJW - Authentication & Authorization 용 State, Dispatch 생성
  const [authState, authDispatch] = useReducer(authReducer, authStateInit)

  return(
    <authDispatchContext.Provider value={authDispatch}>
      <authStateContext.Provider value={authState}>
        { children }
      </authStateContext.Provider>
    </authDispatchContext.Provider>
  )
}