import React, { useState } from 'react';
import MyInfo from '../../../components/user/player/profile/MyInfo';
import Score from '../../../components/user/player/profile/Score';
import MyGym from '../../../components/user/business/profile/MyGym';
import './Profile.css';

const Profile = () => {
  const [userObj, setUserObj] = useState(null); // 로그인한 유저객체
  const [isPlayer, setIsPlayer] = useState(true); // 플레이어, 비즈니스 구분용 임시 state

  const onChangePassword = () => {
    alert('비밀번호 변경');
  };

  const onLogout = () => {
    alert('로그아웃');
  };

  return (
    <div className="profile__div">
      <div className="">
        <img src="profile" alt="profile" />
        <br />
        덩크하는 물소 <br />
        dunkman@ssafy.com
      </div>
      {/* 유저가 플레이어일 경우 */}
      {isPlayer && (
        <>
          <Score userObj={userObj} />
          <MyInfo userObj={userObj} />
        </>
      )}
      {/* 유저가 비즈니스일 경우 */}
      {!isPlayer && (
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
        <span onClick={onChangePassword}>비밀번호 변경</span>
        <span onClick={onLogout}>로그아웃</span>
      </div>
    </div>
  );
};

export default Profile;
