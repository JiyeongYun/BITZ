import axios from "axios";

// Local 에서 돌릴 때는 이 주석 풀고
// const BASE_URL = 'http://127.0.0.1:8080'

// EC@ 에서 돌릴 떄는 이 주석 풀기
const BASE_URL = 'http://i5a504.p.ssafy.io:8080'
 
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
 
// PJW - Game 예약 버튼
const reserveGame = (data,callback,errorCallback) => {
    axios({
      method: "POST",
      url: BASE_URL + "/game/game/reserve",
      data: data
    })
    .then(callback)
    .catch(errorCallback)
}
 
// PJW - Game 입금 확인 버튼
const requsetPaymentCheck = (data,callback,errorCallback) => {
    axios({
      method: "PUT",
      url: BASE_URL + "/game/game/reserve",
      data: data
    })
    .then(callback)
    .catch(errorCallback)
}
 
// PJW - Game 예약 취소 버튼
const cancelReservation = (data,callback,errorCallback) => {
    axios({
      method: "DELETE",
      url: BASE_URL + "/game/gameparticipant",
      data: data
    })
    .then(callback)
    .catch(errorCallback)
}
 
// PJW - Game 확정 버튼
const ConfirmReservation = (data,callback,errorCallback) => {
    axios({
      method: "PUT",
      url: BASE_URL + "/game/gameparticipant",
      data: data
    })
    .then(callback)
    .catch(errorCallback)
}

// PJW - Game 리뷰 여부 확인
const ReviewCheck = (data,callback,errorCallback) => {
  axios({
    method: "GET",
    url: BASE_URL + "/game/review",
    params: data
  })
  .then(callback)
  .catch(errorCallback)
}

// PJW - Game 리뷰 제출
const ApplyReview = (data,callback,errorCallback) => {
  axios({
    method: "POST",
    url: BASE_URL + "/game/review",
    data: data
  })
  .then(callback)
  .catch(errorCallback)
}
 
// PJW - 쿼터별 경기 기록 조회
const getGameRecord = (data,callback,errorCallback) => {
    axios({
      method: "GET",
      url: BASE_URL + "/game/gamerecord",
      params: data
    })
    .then(callback)
    .catch(errorCallback)
}
 
// PJW - 쿼터별 경기 기록 저장
const RecordGame = (data,callback,errorCallback) => {
    axios({
      method: "POST",
      url: BASE_URL + "/game/gamerecord",
      data: data
    })
    .then(callback)
    .catch(errorCallback)
}
 
// PJW - 경기 1시간 전 팀 배정
const Teaming = (data,callback,errorCallback) => {
    axios({
      method: "PUT",
      url: BASE_URL + "/game/teaming",
      data: data
    })
    .then(callback)
    .catch(errorCallback)
}
 
const GameApi = {
  requsetGameList: (data,callback,errorCallback)=>requsetGameList(data,callback,errorCallback),
  registerGame: (data,callback,errorCallback)=>registerGame(data,callback,errorCallback),
  requsetGame:(data,callback,errorCallback)=>requsetGame(data,callback,errorCallback),
  reserveGame:(data,callback,errorCallback)=>reserveGame(data,callback,errorCallback),
  requsetPaymentCheck:(data,callback,errorCallback)=>requsetPaymentCheck(data,callback,errorCallback),
  cancelReservation:(data,callback,errorCallback)=>cancelReservation(data,callback,errorCallback),
  ConfirmReservation:(data,callback,errorCallback)=>ConfirmReservation(data,callback,errorCallback),
  ApplyReview:(data,callback,errorCallback)=>ApplyReview(data,callback,errorCallback),
  ReviewCheck:(data,callback,errorCallback)=>ReviewCheck(data,callback,errorCallback),
  getGameRecord:(data,callback,errorCallback)=>getGameRecord(data,callback,errorCallback),
  RecordGame:(data,callback,errorCallback)=>RecordGame(data,callback,errorCallback),
  Teaming:(data,callback,errorCallback)=>Teaming(data,callback,errorCallback),
}

export default GameApi 