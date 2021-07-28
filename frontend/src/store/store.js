import React, {createContext, useReducer} from "react";

const initialState = {
  gameList: [],
};
const store = createContext(initialState);
const {Provider} = store;

const StateProvider = ({children}) => {
  const [state, dispatch] = useReducer((arg,action)=>{
    switch(action.type) {
      case 'GET_GAME_LIST':
        const newState = {...state, arg}
        return newState;
      default:
        throw new Error();
    };
  },initialState);

  return <Provider value={{state,dispatch}}>{children}</Provider>;
}

export {store, StateProvider}