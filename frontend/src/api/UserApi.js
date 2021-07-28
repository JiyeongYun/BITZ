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

// PJW - 회원가입 axios 요청
const requsetJoin = (data, callback, errorCallback) => {
  axios({
    method: 'post',
    url: 'http://127.0.0.1:8080/account/createuser',
    data: data,
  })
    .then(callback)
    .catch(errorCallback);
}; // requestJoin End

const UserApi = {
  requsetJoin: (data, callback, errorCallback) => requsetJoin(data, callback, errorCallback),
  requestLogin: (data, callback, errorCallback) => requestLogin(data, callback, errorCallback),
};

export default UserApi;
