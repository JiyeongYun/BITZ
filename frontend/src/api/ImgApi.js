import axios from "axios";

const BASE_URL = 'http://i5a504.p.ssafy.io:8080'
// const BASE_URL = 'http://127.0.0.1:8080'
 
// KOW - 사용자 프로필 이미지 저장
const uploadUserImg = (data, callback, errorCallback) => {
  axios({
    method: 'post',
    url: BASE_URL + '/amazons3/userprofile/upload',
    data: data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
    .then(callback)
    .catch(errorCallback);
}; 
 
// KOW - 사용자 프로필 이미지 출력
const getUserImg = (data, callback, errorCallback) => {
  axios({
    method: 'post',
    url: BASE_URL + '/amazons3/userprofile/get',
    params: data,
    responseType: "blob",
  })
    .then(callback)
    .catch(errorCallback);
}; 
 
// KOW - 사용자 프로필 이미지 수정
const updateUserImg = (data, callback, errorCallback) => {
  axios({
    method: 'put',
    url: BASE_URL + '/amazons3/userprofile/update',
    data: data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
    .then(callback)
    .catch(errorCallback);
}; 
 
// KOW - 사용자 프로필 이미지 삭제
const deleteUserImg = (data, callback, errorCallback) => {
  axios({
    method: 'delete',
    url: BASE_URL + '/amazons3/userprofile/delete',
    params: data,
  })
    .then(callback)
    .catch(errorCallback);
}; 
 
const ImgApi = {
    uploadUserImg:(data,callback,errorCallback)=>uploadUserImg(data,callback,errorCallback),
    getUserImg:(data,callback,errorCallback)=>getUserImg(data,callback,errorCallback),
    updateUserImg:(data,callback,errorCallback)=>updateUserImg(data,callback,errorCallback),
    deleteUserImg:(data,callback,errorCallback)=>deleteUserImg(data,callback,errorCallback),
}
export default ImgApi 