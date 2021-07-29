import axios from 'axios';

// JHW - 로그인 axios 요청
const requestLogin = (data, callback, errorCallback) => {
  axios({
    method: 'post',
    url: 'http://127.0.0.1:8080/account/readuserauth',
    data: data,
  })
    .then(callback)
    .catch(errorCallback);
}; // requestLogin End

// KOW - 회원가입 axios 요청
const requestJoin = (data, callback, errorCallback) => {
  axios({
    method: 'post',
    url: 'http://127.0.0.1:8080/account/createuser',
    data: data,
  })
    .then(callback)
    .catch(errorCallback);
}; // requestJoin End

// PJW - 비밀번호 변경
const changePassword = (data, callback, errorCallback) => {
  axios({
    method: 'put',
    url: 'http://127.0.0.1:8080//account/updatepassword',
    data: data,
  })
    .then(callback)
    .catch(errorCallback);
}; // changePassword End

const UserApi = {
  requestJoin: (data, callback, errorCallback) => requestJoin(data, callback, errorCallback),
  requestLogin: (data, callback, errorCallback) => requestLogin(data, callback, errorCallback),
  changePassword: (data, callback, errorCallback) => changePassword(data, callback, errorCallback),
};

export default UserApi;
