import { createContext, useReducer } from "react";
/*
Context API 사용법
1. Reducer 선언 (함수 바깥)
2. Context 선언 (함수 바깥)
3. useReducer 선언 (함수 안) => Reducer -> State - Dispatch 연결
4. 연결된 State, Dispatch를 Provider로 내려보내기
5. useContext를 이용해 State, Dispatch를 내려받아 사용 / 변경
*/

// State (명시적 선언 ; 정의 용도) - (0)
// PJW - Authentication & Authorization 용 State 초기값 정의
 const authStateInit = {
   isLoggedIn: false,
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

export default function authContext ({ children }) {
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