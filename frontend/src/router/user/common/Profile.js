import React, { useContext, useState } from 'react';
import MyInfo from '../../../components/user/player/profile/MyInfo';
import Score from '../../../components/user/player/profile/Score';
import MyGym from '../../../components/user/business/profile/MyGym';
import './Profile.css';
import { Link } from 'react-router-dom';
import { store } from 'store/store.js'; // store import (store)

const Profile = () => {
  // 전역 상태 관리 (store)
  const globalState = useContext(store);
  const { userKind } = globalState.value; // 플레이어, 비즈니스 구분용 전역 State

  const [userObj, setUserObj] = useState(null); // 로그인한 유저객체
  // const [isPlayer, setIsPlayer] = useState(true); // 플레이어, 비즈니스 구분용 임시 state

  const onLogout = () => {
    alert('로그아웃');
  };

  return (
    <div className="profile__div">
      <div className="user__profile">
        <img src="/images/symbol.png" alt="profile" />
        <p id="nickname">덩크하는 물소</p>
        <p id="email">{globalState.value.isLogin}</p>
      </div>
      {/* 유저가 플레이어일 경우 */}
      {userKind==='player' && (
        <>
          <Score userObj={userObj} />
          <MyInfo userObj={userObj} />
        </>
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
      <div className="accountSetting">
        <h2>계정 관리</h2>
        <Link to="/accounts/change_password">비밀번호 변경</Link>
        <span onClick={onLogout}>로그아웃</span>
      </div>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </div>
  );
};

export default Profile;
