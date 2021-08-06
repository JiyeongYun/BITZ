import axios from "axios";

const BASE_URL = 'http://i5a504.p.ssafy.io:8080'
 
// PJW - Game Data 요청
const requsetGameList = (data,callback,errorCallback) => {

  const isTest = true
  if (isTest) {
    callback()
  } else {
    axios({
      method: "post",
      url: BASE_URL + "/account/signup",
      data: data
    })
    .then(callback)
    .catch(errorCallback)
  }
 
} // requestJoin End
 
const GameApi = {
  requsetGameList:(data,callback,errorCallback)=>requsetGameList(data,callback,errorCallback),
}

export default GameApi 