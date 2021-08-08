import React, { useState } from 'react';
import './MyInfo.css';
import Location from '../Location';
import UserApi from 'api/UserApi';

const MyInfo = ({ userObj, userData, setUserData }) => {
  const [isUpdate, setIsUpdate] = useState(false);

  // 포지션 클릭 시 값 변경
  const onClick = (e) => {
    const {target: {id}} = e
    if (id === 'guard') {
      setUserData({...userData, guard:!userData.guard})
    } else if (id === 'forward') {
      setUserData({...userData, forward:!userData.forward})
    } else if (id === 'center') {
      setUserData({...userData, center:!userData.center})
    }
  }

  // 버튼 클릭 시
  const onClickBtn = () => {
    if (isUpdate) {
      // 수정된 값으로 DB 변경
      UserApi.UpdateMyProfile(
        userData,
        res => {alert("수정되었습니다.")},
        err => {console.log(err)}
      )
    }
    setIsUpdate(!isUpdate)
  }

  // 번호 및 신장 정보 변경
  const onChange = (e) => {
    if (e.target.name === 'height'){
      setUserData({...userData, height:e.target.value})
    } else if (e.target.name === 'phone') {
      setUserData({...userData, phone:e.target.value})
    }
  }

  // 선호 지역 변경
  const setSido1 = (value) => {
    setUserData({...userData, sido1:value})
  }
  const setSido2 = (value) => {
    setUserData({...userData, sido2:value})
  }
  const setSido3 = (value) => {
    setUserData({...userData, sido3:value})
  }
  const setGugun1 = (value) => {
    setUserData({...userData, gugun1:value})
  }
  const setGugun2 = (value) => {
    setUserData({...userData, gugun2:value})
  }
  const setGugun3 = (value) => {
    setUserData({...userData, gugun3:value})
  }

  return (
    <div className="MyInfo">
      <h2>내 정보</h2>
      <div className="phone">
        <p>핸드폰 번호</p>
        <form className="phoneForm" name="phoneForm">
          <input type="text" name="phone" disabled={isUpdate?false:true} onChange={onChange} value={userData.phone?userData.phone : ""} />
        </form>
      </div>
      <div className="height">
        <p>신장</p>
        <form className="heightForm" name="heightForm">
          <input type="text" name="height" disabled={isUpdate?false:true} onChange={onChange} value={userData.height?userData.height : ""} /><span>cm</span>
        </form>
      </div>
      <div className="position">
        <p>포지션</p>
        <form className="positionForm" name="positionForm">
          <input
            type="checkbox"
            name="position"
            value="guard"
            className="position__check"
          />
          <span id="guard" onClick={isUpdate? onClick: undefined} className={userData.guard ? 'checked' : ''} >가드</span>
          <input
            type="checkbox"
            name="position"
            value="forward"
            className="position__check"
          />
          <span id="forward" onClick={isUpdate? onClick: undefined} className={userData.forward ? 'checked' : ''} >포워드</span>
          <input
            type="checkbox"
            name="position"
            value="center"
            className="position__check"
          />
          <span id="center" onClick={isUpdate? onClick: undefined} className={userData.center ? 'checked' : ''} >센터</span>
        </form>
      </div>
      <div className="location">
        <p>선호지역</p>
        <div className="location__box">
          <div>
            <p>1 지망</p>
            {isUpdate? 
              <Location setSido={setSido1} setGugun={setGugun1}/> :
              <div>
                <p>{userData.sido1}</p>
                <p>{userData.gugun1}</p>
              </div>
            }
          </div>
          <div>
            <p>2 지망</p>
            {isUpdate? 
              <Location setSido={setSido2} setGugun={setGugun2}/> :
              <div>
                <p>{userData.sido2}</p>
                <p>{userData.gugun2}</p>
              </div>
            }
          </div>
          <div>
            <p>3 지망</p>
            {isUpdate? 
              <Location setSido={setSido3} setGugun={setGugun3}/> :
              <div>
                <p>{userData.sido3}</p>
                <p>{userData.gugun3}</p>
              </div>
            }
          </div>
        </div>
      </div>
      <button className="save__btn" onClick={onClickBtn}>{isUpdate? '저장':'수정'}</button>
    </div>
  );
};

export default MyInfo;
