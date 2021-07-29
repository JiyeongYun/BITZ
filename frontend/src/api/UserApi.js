import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8080'

// JHW - 로그인 axios 요청
const requestLogin = (data, callback, errorCallback) => {
  axios({
    method: 'post',
    url: BASE_URL + '/account/readuserauth',
    data: data,
  })
    .then(callback)
    .catch(errorCallback);
}; // requestLogin End

// PJW - 회원가입 axios 요청
const requestJoin = (data, callback, errorCallback) => {
  axios({
    method: 'post',
    url: BASE_URL + '/account/createuser',
    data: data,
  })
    .then(callback)
    .catch(errorCallback);
}; // requestJoin End

// KOW - 비밀번호 찾기 axios 요청
const findPwd = (data, callback, errorCallback) => {
  axios({
    method: 'PUT',
    url: BASE_URL + '/account/readpassword',
    data: data,
  })
    .then(callback)
    .catch(errorCallback)
}

const UserApi = {
  requestJoin: (data, callback, errorCallback) => requestJoin(data, callback, errorCallback),
  requestLogin: (data, callback, errorCallback) => requestLogin(data, callback, errorCallback),
  findPwd: (data, callback, errorCallback) => findPwd(data, callback, errorCallback),
};

export default UserApi;
