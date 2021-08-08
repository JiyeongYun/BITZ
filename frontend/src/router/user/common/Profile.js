import React, { useContext, useEffect, useState } from 'react';
import MyInfo from '../../../components/user/player/profile/MyInfo';
import Score from '../../../components/user/player/profile/Score';
import MyGym from '../../../components/user/business/profile/MyGym';
import './Profile.css';
import { Link } from 'react-router-dom';
import { store } from 'store/store.js'; // store import (store)
import UserApi from 'api/UserApi';

const Profile = ({ history }) => {
  // 전역 상태 관리 (store)
  const globalState = useContext(store);
  const { value, dispatch } = globalState;
  const { userKind, userObj } = value; // 플레이어, 비즈니스 구분용 전역 State

  // 유저 정보가 담긴 State
  const [userData, setUserData] = useState({email: "", birth: ""})

  const onLogout = () => {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("currentUserbusiness")
    dispatch({ type: "LOGIN", value: "" })
    history.push('/')
  };
  

  // 유저 정보를 DB에서 가져오기
  useEffect(() => {
    const params = {email:value.isLogin}
    UserApi.myprofile(
      params,
      res => {
        setUserData(res.data)
      },
      err => {
        console.log(err)
      }
    )
  }, [value.isLogin])

  return (
    <div className="profile__div">
      <div className="user__profile">
        <img src="/images/KOW.png" alt="profile" />
        <p id="nickname">덩크하는 물소</p>
        <p id="email">{userData.email}</p>
        <p id="birth">{userData.birth.slice(0,4)}.{userData.birth.slice(4,6)}.{userData.birth.slice(6)}</p>
      </div>
      {/* 유저가 플레이어일 경우 */}
      {userKind==='player' && (
        <div className="left_right_profile">
          <Score userObj={userObj} userData={userData} />
          <MyInfo userObj={userObj} userData={userData} setUserData={setUserData} />
        </div>
      )}
      {/* 유저가 비즈니스일 경우 */}
      {userKind==="business" && (
        <>
          <div className="businessAccount">
            계좌번호 : 국민은행
            <br />
            계좌번호 : 349401-04-269363
            <br />
          </div>
          <MyGym />
        </>
      )}
      {/* <hr/> */}
      <div className="accountSetting">
        <h2>계정 관리</h2>
        <Link to="/accounts/change_password">비밀번호 변경</Link>
        <span onClick={onLogout}>로그아웃</span>
      </div>
    </div>
  );
};

export default Profile;
