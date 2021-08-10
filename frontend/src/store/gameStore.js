import React, {createContext, useReducer} from "react";
// GameDetail에서 사용하는 전역 데이터

const initialState = {
  // 경기 정보
  gameInfo: {
    startTime: "00:00:00",
    endTime: "00:00:00",
    // 0: 예약 페이지, 1: 게임 1시간 전 팀 정보 페이지, 2: 게임 시작 중, 3: 게임 종료(1시간 동안 기록 가능), 4: 게임 종료(Data Fix)
    gym: {},
    date: 0,
  },
  gameState: 0,
  // 참가자
  gameParticipantList: [],
  gameParticipantDetails: [],
  // 경기 기록
  gameData: {
    gameType: 2, // 2: 2팀, 3: 3팀
    game1_team1_score: [],
    game1_team2_score: [],
    game2_team1_score: [],
    game2_team2_score: [],
    game3_team1_score: [],
    game3_team2_score: [],
    game1_recorder: [], // 2팀 게임은 game1만 사용
    game2_recorder: [],
    game3_recorder: [],
  },
};
const gameStore = createContext(initialState);
const {Provider} = gameStore;

const GameStateProvider = ({children}) => {
  const [aboutGame, gameDispatch] = useReducer((state,action)=>{
    switch(action.type) {
      // GameData 저장
      case 'FETCH_GAME_DATA':
        const gameData = action.value
        return {...state, ...gameData};
      // 시간에 따른 게임 State 변경
      case 'UPDATE_GAME_STATE':
        let gameState = 0
        const current_time = new Date().getTime();
        const time = new Date()
        time.setTime(state.gameInfo.date)
        const start_time = new Date(time.getFullYear(), time.getMonth(), time.getDate() , state.gameInfo.startTime.substr(0,2), parseInt(state.gameInfo.startTime.substr(3,2))).getTime();
        const end_time = new Date(time.getFullYear(), time.getMonth(), time.getDate() , state.gameInfo.endTime.substr(0,2), state.gameInfo.endTime.substr(3,2)).getTime();
        // 게임 준비
        if (current_time>=start_time-3600000) {
          gameState = 1
        }
        // 게임 중
        if (current_time>=start_time) {
          gameState = 2
        }
        // 게임 종료
        if (current_time>=end_time) {
          gameState = 3
        }
        // 게임 종료 (Fix)
        if (current_time>=end_time+3600000) {
          gameState = 4
        }
        return {...state, gameState}
      // 쿼터별 점수 등록
      case 'UPADTE_GAME_SCORE':
        if (action.value.unKnown_bugFix === state.gameData[action.value.recorder].length) { // 함수 1번 실행 => dispatch 2번 실행 => state 3번 변경이라는 해괴한 오류 방지
          const updated_team1_score = state.gameData[action.value.team1]
          updated_team1_score.push(action.value.team1_score)
          const updated_team2_score = state.gameData[action.value.team2]
          updated_team2_score.push(action.value.team2_score)
          const updated_recorder = state.gameData[action.value.recorder]
          updated_recorder.push(action.value.current_recorder)
          
          return {
            ...state,
            gameData: {
              ...state.gameData,
              [action.value.team1]: updated_team1_score,
              [action.value.team2]: updated_team2_score,
              [action.value.recorder]: updated_recorder
            }
          }
        }
        return state
      // 경기 참여자 상세 정보 받기
      case 'FETCH_PARTICIPANTS_DETAIL':
        const { gameParticipantDetails } = state
        gameParticipantDetails[action.value.idx] = action.value
        return {...state, gameParticipantDetails}
        
      default:
        throw new Error();
    };
  },initialState);
  
  return <Provider value={{aboutGame,gameDispatch}}>{children}</Provider>;
}

export {gameStore, GameStateProvider}