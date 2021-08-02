import React, { navigator, useEffect, useState } from 'react';
import './GameInfo.css';
import GymInfo from './GymInfo';
import Participant from './Participant';

const GameInfo = () => {
  // 픽업게임에 대한 정보를 보여주는 컴포넌트

  // 체육관 정보
  const gymInfo = {
    name: "역삼 싸피 체육관",
    address: "서울시 강남구 역삼동 테헤란로 212"
  }

  // 복사
  const copyAddress = () => {
    const textarea = document.createElement("textarea")
    textarea.value = gymInfo.address
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand("copy")
    document.body.removeChild(textarea)
    alert("주소가 복사되었습니다.")
  }

  const [users, setUsers] = useState([
    {
      initial: 'KOW',
      name: '권오우',
      height: 190,
      center: true,
      guard: true,
      foward: false,
      manner: 97,
      skill: false,
      photoUrl: '',
    },
  ]);

  const over = (event) => {
    const {
      target: { id },
    } = event;
    document.getElementsByClassName(`${id}user`)[0].style.display = 'block';
  };
  const out = (event) => {
    const {
      target: { id },
    } = event;
    document.getElementsByClassName(`${id}user`)[0].style.display = 'none';
  };

  return (
    <div className="gameInfo">
      <div className="gamedate">
        <p>2021년 7월 21일 수요일</p>
        <p>10:00 ~ 12:00</p>
      </div>
      <div className="gyminfo">
        <p id="gymname">{gymInfo.name}</p>
        <p id="gymaddress">{gymInfo.address} | <button onClick={copyAddress}>주소복사</button></p> 
      </div>
      <div className="gameuser">
        <p>모집 인원 12~18명</p>
        <p>현재 모인 인원은 <span>13 </span> 명 입니다.</p>
        <p>참가비 <span>10,000</span> 원</p>
      </div>
      <Participant />
      {users.map((user, idx) => {
        // console.log(idx);
        return (
          <>
            <img
              id={idx}
              src={process.env.PUBLIC_URL + `/images/KOW.jpg`}
              className="userImg"
              onMouseOver={over}
              onMouseOut={out}
            ></img>
            <div className={idx + 'user spec'} kdy={idx}>
              <div className="test">
                <div>
                  {user.name}
                  <br />
                  {user.height}cm
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default GameInfo;
