import axios from "axios";

// Local 에서 돌릴 때는 이 주석 풀고
const BASE_URL = 'http://127.0.0.1:8080'

// EC@ 에서 돌릴 떄는 이 주석 풀기
// const BASE_URL = 'http://i5a504.p.ssafy.io:8080'
 
// PJW - Game List Data 요청
const requsetGameList = (data,callback,errorCallback) => {
    axios({
      method: "get",
      url: BASE_URL + "/game/game/list",
      params: data
    })
    .then(callback)
    .catch(errorCallback)
}
 
// PJW - Game Data 요청
const requsetGame = (data,callback,errorCallback) => {
    axios({
      method: "get",
      url: BASE_URL + "/game/game",
      params: data
    })
    .then(callback)
    .catch(errorCallback)
}

// KOW - Game 등록 요청
const registerGame = (data, callback, errorCallback) => {
  axios({
    method: "post",
    url: BASE_URL + "/game/game",
    data: data,
  })
  .then(callback)
  .catch(errorCallback)
}
 
const GameApi = {
  requsetGameList: (data,callback,errorCallback)=>requsetGameList(data,callback,errorCallback),
  registerGame: (data,callback,errorCallback)=>registerGame(data,callback,errorCallback),
  requsetGame:(data,callback,errorCallback)=>requsetGame(data,callback,errorCallback),
}

export default GameApi 