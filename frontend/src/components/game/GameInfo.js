import React, { useState } from 'react';
import './GameInfo.css';
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
      height: 176,
      position: [
        'guard',
        'forward'
      ],
      manner: 97,
      skill: false,
      photoUrl: '',
    },
    {
      initial: 'PJW',
      name: '박정웅',
      height: 187,
      position: [
        'center'
      ],
      manner: 100,
      skill: 100,
      photoUrl: '',
    },
    {
      initial: 'YJY',
      name: '윤지영',
      height: 170,
      position: [
        'guard'
      ],
      manner: 99,
      skill: 99,
      photoUrl: '',
    },
    {
      initial: 'LSE',
      name: '이소은',
      height: 173,
      position: [
        'guard'
      ],
      manner: 98,
      skill: 98,
      photoUrl: '',
    },
    {
      initial: 'JHW',
      name: '장현웅',
      height: 184,
      position: [
        'forward'
      ],
      manner: 97,
      skill: 97,
      photoUrl: '',
    },
  ]);

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

      {/* 참여자들 정보 및 프로필 사진 */}
      <div className="participants">
        {users.map((user, idx) => {
          return (
            <Participant 
              key={idx}
              idx={idx}
              user={user}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GameInfo;
