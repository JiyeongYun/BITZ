import axios from "axios";

// const BASE_URL = 'http://i5a504.p.ssafy.io:8080'
const BASE_URL = 'http://127.0.0.1:8080'
 
// PJW - 체육관 등록
const requestGymRegister = (data, callback, errorCallback) => {
  console.log(data)
  axios({
    method: 'post',
    url: BASE_URL + '/gym/gym',
    data: data,
  })
    .then(callback)
    .catch(errorCallback);
}; // requestLogin End
 
// PJW - 체육관 조회
const requestGym = (data, callback, errorCallback) => {
  axios({
    method: 'get',
    url: BASE_URL + '/gym/gym',
    data: data,
  })
    .then(callback)
    .catch(errorCallback);
}; // requestLogin End
 
// PJW - 체육관 수정
const requestGymUpdate = (data, callback, errorCallback) => {
  axios({
    method: 'put',
    url: BASE_URL + '/gym/gym',
    data: data,
  })
    .then(callback)
    .catch(errorCallback);
}; // requestLogin End
 
// PJW - 체육관 제거
const requestGymDelete = (data, callback, errorCallback) => {
  axios({
    method: 'delete',
    url: BASE_URL + '/gym/gym',
    data: data,
  })
    .then(callback)
    .catch(errorCallback);
}; // requestLogin End

const myGymList = (data, callback, errorCallback) => {
  axios({
    method: 'get',
    url: BASE_URL + '/gym/gymlist',
    params: data
  })
    .then(callback)
    .catch(errorCallback)
}
 
const GymApi = {
  requestGymRegister:(data,callback,errorCallback)=>requestGymRegister(data,callback,errorCallback),
  requestGym:(data,callback,errorCallback)=>requestGym(data,callback,errorCallback),
  requestGymUpdate:(data,callback,errorCallback)=>requestGymUpdate(data,callback,errorCallback),
  requestGymDelete:(data,callback,errorCallback)=>requestGymDelete(data,callback,errorCallback),
  myGymList:(data,callback,errorCallback)=>myGymList(data,callback,errorCallback),
}

export default GymApi 