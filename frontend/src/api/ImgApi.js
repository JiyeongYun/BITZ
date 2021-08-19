import axios from "axios";

const BASE_URL = 'http://i5a504.p.ssafy.io:8080'
// const BASE_URL = 'http://127.0.0.1:8080'
 
// KOW - 사용자 프로필 이미지 저장
const uploadUserImg = (data, callback, errorCallback) => {
  axios({
    method: 'post',
    url: BASE_URL + '/amazons3/upload/userprofile',
    data: data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
    .then(callback)
    .catch(errorCallback);
}; 
 
// KOW - 사용자 프로필 이미지 출력
const getUserImg = async (data, callback, errorCallback) => {
  axios({
    method: 'post',
    url: BASE_URL + '/amazons3/get/userprofile',
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
    url: BASE_URL + '/amazons3/update/userprofile',
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
    url: BASE_URL + '/amazons3/delete/userprofile',
    params: data,
  })
    .then(callback)
    .catch(errorCallback);
};
 
// KOW - 사업자등록증 이미지 저장
const uploadRegImg = (data, callback, errorCallback) => {
  axios({
    method: 'post',
    url: BASE_URL + '/amazons3/upload/businessauth',
    data: data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
    .then(callback)
    .catch(errorCallback);
}; 
 
// KOW - 사업자등록증 이미지 출력
const getRegImg = (data, callback, errorCallback) => {
  axios({
    method: 'post',
    url: BASE_URL + '/amazons3/get/businessauth',
    params: data,
    responseType: "blob",
  })
    .then(callback)
    .catch(errorCallback);
}; 
 
// KOW - 사업자등록증 이미지 수정
const updateRegImg = (data, callback, errorCallback) => {
  axios({
    method: 'put',
    url: BASE_URL + '/amazons3/update/businessauth',
    data: data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
    .then(callback)
    .catch(errorCallback);
}; 
 
// KOW - 사업자등록증 이미지 삭제
const deleteRegImg = (data, callback, errorCallback) => {
  axios({
    method: 'delete',
    url: BASE_URL + '/amazons3/delete/businessauth',
    params: data,
  })
    .then(callback)
    .catch(errorCallback);
};
 
// KOW - 사업자 프로필 이미지 저장
const uploadBusImg = (data, callback, errorCallback) => {
  axios({
    method: 'post',
    url: BASE_URL + '/amazons3/upload/businessprofile',
    data: data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
    .then(callback)
    .catch(errorCallback);
}; 
 
// KOW - 사업자 프로필 이미지 출력
const getBusImg = (data, callback, errorCallback) => {
  axios({
    method: 'post',
    url: BASE_URL + '/amazons3/get/businessprofile',
    params: data,
    responseType: "blob",
  })
    .then(callback)
    .catch(errorCallback);
}; 
 
// KOW - 사업자 프로필 이미지 수정
const updateBusImg = (data, callback, errorCallback) => {
  axios({
    method: 'put',
    url: BASE_URL + '/amazons3/update/businessprofile',
    data: data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
    .then(callback)
    .catch(errorCallback);
}; 
 
// KOW - 사업자 프로필 이미지 삭제
const deleteBusImg = (data, callback, errorCallback) => {
  axios({
    method: 'delete',
    url: BASE_URL + '/amazons3/delete/businessprofile',
    params: data,
  })
    .then(callback)
    .catch(errorCallback);
};
 
 
// KOW - 체육관 이미지 저장
const uploadGymImg = (data, callback, errorCallback) => {
  axios({
    method: 'post',
    url: BASE_URL + '/amazons3/upload/gym',
    data: data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
    .then(callback)
    .catch(errorCallback);
}; 
 
// KOW - 체육관 이미지 출력
const getGymImg = (data, callback, errorCallback) => {
  axios({
    method: 'post',
    url: BASE_URL + '/amazons3/get/gym',
    params: data,
    responseType: "blob",
  })
    .then(callback)
    .catch(errorCallback);
}; 
 
// KOW - 체육관 이미지 수정
const updateGymImg = (data, callback, errorCallback) => {
  axios({
    method: 'put',
    url: BASE_URL + '/amazons3/update/gym',
    data: data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
    .then(callback)
    .catch(errorCallback);
}; 
 
// KOW - 체육관 이미지 삭제
const deleteGymImg = (data, callback, errorCallback) => {
  axios({
    method: 'delete',
    url: BASE_URL + '/amazons3/delete/gym',
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
    uploadRegImg:(data,callback,errorCallback)=>uploadRegImg(data,callback,errorCallback),
    getRegImg:(data,callback,errorCallback)=>getRegImg(data,callback,errorCallback),
    updateRegImg:(data,callback,errorCallback)=>updateRegImg(data,callback,errorCallback),
    deleteRegImg:(data,callback,errorCallback)=>deleteRegImg(data,callback,errorCallback),
    uploadBusImg:(data,callback,errorCallback)=>uploadBusImg(data,callback,errorCallback),
    getBusImg:(data,callback,errorCallback)=>getBusImg(data,callback,errorCallback),
    updateBusImg:(data,callback,errorCallback)=>updateBusImg(data,callback,errorCallback),
    deleteBusImg:(data,callback,errorCallback)=>deleteBusImg(data,callback,errorCallback),
    uploadGymImg:(data,callback,errorCallback)=>uploadGymImg(data,callback,errorCallback),
    getGymImg:(data,callback,errorCallback)=>getGymImg(data,callback,errorCallback),
    updateGymImg:(data,callback,errorCallback)=>updateGymImg(data,callback,errorCallback),
    deleteGymImg:(data,callback,errorCallback)=>deleteGymImg(data,callback,errorCallback),
}
export default ImgApi 