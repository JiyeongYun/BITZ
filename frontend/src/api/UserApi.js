import axios from 'axios';

// Local 에서 돌릴 때는 이 주석 풀고
const BASE_URL = 'http://127.0.0.1:8080'

// EC@ 에서 돌릴 떄는 이 주석 풀기
// const BASE_URL = 'http://i5a504.p.ssafy.io:8080'

// JHW - 플레이어 로그인 axios 요청
const requestLogin = (data, callback, errorCallback) => {
  axios({
    method: 'post',
    url: BASE_URL + '/account/user/userauth/login',
    data: data,
  })
    .then(callback)
    .catch(errorCallback);
}; // requestLogin End

// PJW - 비즈니스 로그인 axios 요청
const requestBusinessLogin = (data, callback, errorCallback) => {
  axios({
    method: 'post',
    url: BASE_URL + '/account/business/businessauth/login',
    data: data,
  })
    .then(callback)
    .catch(errorCallback);
}; // requestBusinessLogin End

// KOW - 플레이어 회원가입 axios 요청
const requestJoin = (data, callback, errorCallback) => {
  axios({
    method: 'post',
    url: BASE_URL + '/account/user/userauth',
    data: data,
  })
    .then(callback)
    .catch(errorCallback);
}; // requestJoin End

// JHW - 비즈니스 회원가입 axios 요청
const requestBusinessJoin = (data, headers, callback, errorCallback) => {
  axios({
    method: 'post',
    url: BASE_URL + '/account/business/businessauth',
    data: data,
    headers: headers,
  })
    .then(callback)
    .catch(errorCallback);
}; // requestJoin End

// PJW - 비밀번호 변경
const changePassword = (data, callback, errorCallback) => {
  axios({
    method: 'put',
    url: BASE_URL + '/account/user/userauth/password/change',
    data: data,
  })
    .then(callback)
    .catch(errorCallback);
}; // changePassword End

// KOW - 비밀번호 찾기 axios 요청
const findPwd = (data, callback, errorCallback) => {
  axios({
    method: 'PUT',
    url: BASE_URL + '/account/user/userauth/password/reset',
    data: data,
  })
    .then(callback)
    .catch(errorCallback)
}

const firstLogin = (data, callback, errorCallback) => {
  axios({
    method: 'POST',
    url: BASE_URL + '/account/user/loginlog',
    data: data,
  })
    .then(callback)
    .catch(errorCallback)
}

// KOW - 신장, 포지션, 실력, 선호 지역 데이터 저장
const firstLoginData = (data, callback, errorCallback) => {
  axios({
    method: 'POST',
    url: BASE_URL + '/account/user/userprofile',
    data: data
  })
    .then(callback)
    .catch(errorCallback)
}

const UserApi = {
  requestJoin: (data, callback, errorCallback) => requestJoin(data, callback, errorCallback),
  requestLogin: (data, callback, errorCallback) => requestLogin(data, callback, errorCallback),
  changePassword: (data, callback, errorCallback) => changePassword(data, callback, errorCallback),
  findPwd: (data, callback, errorCallback) => findPwd(data, callback, errorCallback),
  firstLogin: (data, callback, errorCallback) => firstLogin(data, callback, errorCallback),
  requestBusinessJoin: (data, headers, callback, errorCallback) => requestBusinessJoin(data, headers, callback, errorCallback),
  requestBusinessLogin: (data, headers, callback, errorCallback) => requestBusinessLogin(data, headers, callback, errorCallback),
  firstLoginData: (data, headers, callback, errorCallback) => firstLoginData(data, headers, callback, errorCallback),
};

export default UserApi;
