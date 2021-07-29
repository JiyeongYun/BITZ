import React, {createContext, useReducer} from "react";

// Store - (1) 초기값 설정 *****
const initialState = {
  a: "초기화", 
  gameList: [], 
  isLogin: '',
  userKind: 'player'
};
// Store - (2) 초기값을 넣은 Context 생성 *****
const store = createContext(initialState);
// Store - (3) 위의 Context와 관련된 Provider 생성 : Index.js 용도 (모든 컴포넌트에서 Store 접근 가능하게 만드는 역할)
const {Provider} = store;

// Store - (4) 위에서 만든 Provider를 Return하는 React Component : React 관련 내용물은 항상 React Component 형식이 필요
const StateProvider = ({children}) => {
  // Store - (5) useReducer를 사용해 value와 value를 업데이트하는 dispatch 생성 *****
  const [value, dispatch] = useReducer((state,action)=>{
    switch(action.type) {
      // store.js 구성 시연용 action type
      case 'TEST':
        const newState = {b: "업데이트"}
        return {...state, ...newState};
      // Game List 생성 action type
      case 'GET_GAME_LIST':
        const gameList = action.value
        return {...state, gameList};
      // 로그인 action type
      case 'LOGIN':
        const isLogin = action.value
        return {...state, isLogin};
      // Player, Business 계정 선택 action type
      case 'SELECT_USER_KIND':
        const userKind = action.value
        return {...state, userKind};
      default:
        throw new Error();
    };
  },initialState);
  
  // Store - (6) Context의 Return 형식 (Context는 항상 이렇게 내려보내야 해서 Provider 형식으로 Return 해 줌)
  return <Provider value={{value,dispatch}}>{children}</Provider>;
}

export {store, StateProvider}