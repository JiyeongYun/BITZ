// Context file 불러오기
import { authStateContext, authDispatchContext } from "./authContext";

// state 모음
const stateMap = {
  auth: authStateContext,
};

// dispatch 모음
const dispatchMap = {
  auth: authDispatchContext,
};

// state 선택 callback | useSelector(state => state.auth) | 이런 식으로 사용
export const useSelector = (callback) => {
  return callback(stateMap)();
};

// dispatch 선택 callback | useDispatch(dispatch => dispatch.auth) | 이런 식으로 사용
export const useDispatch = (callback) => {
  return callback(dispatchMap)();
};