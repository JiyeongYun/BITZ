import axios from "axios";
 
// PJW - Game Data 요청
const requsetGameList = (data,callback,errorCallback) => {

  const isTest = true
  if (isTest) {
    callback()
  } else {
    axios({
      method: "post",
      url: "http://127.0.0.1:8080/account/signup",
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