import React, { useEffect, useState } from 'react';
import './GameInfo.css';

const GameInfo = () => {
  // 픽업게임에 대한 정보를 보여주는 컴포넌트
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
      2021년 7월 21일 수요일
      <br />
      10:00 ~ 21:00
      <br />
      <span id="gymName">역삼 싸피 체육관</span>
      <br />
      서울시 강남구 역삼동 테헤란로 212 | 주소복사
      <br />
      모집인원 12 ~ 18명
      <br />
      현재 모인 인원은 {users.length}명
      <br />
      참가비 : 10,000 원
      <br />
      {users.map((user, idx) => {
        console.log(idx);
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
