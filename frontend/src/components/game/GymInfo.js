import React, { useEffect, useState } from 'react';
import './GymInfo.css';

const GymInfo = () => {
  // 픽업게임 상세보기에서 체육관 정보를 보여주는 컴포넌트

  const [water, setWater] = useState(true);
  const [shower, setShower] = useState(false);
  const [scoreboard, setScoreboard] = useState(true);
  const [parking, setParking] = useState(true);
  const [basketball, setBasketball] = useState(true);
  const [airconditioner, setAirconditioner] = useState(true);

  useEffect(() => {
    if (!water) {
      document.getElementsByName('water')[0].classList.add('no');
    }
    if (!shower) {
      document.getElementsByName('shower')[0].classList.add('no');
    }
    if (!scoreboard) {
      document.getElementsByName('scoreboard')[0].classList.add('no');
    }
    if (!parking) {
      document.getElementsByName('parking')[0].classList.add('no');
    }
    if (!basketball) {
      document.getElementsByName('basketball')[0].classList.add('no');
    }
    if (!airconditioner) {
      document.getElementsByName('airconditioner')[0].classList.add('no');
    }
  });

  return (
    <div className="gymInfo">
      <div className="introduce">
        저희 코트장의 코트 규격은 <input type="text" placeholder="28m x 15m" /> 입니다.
        <br />
        편의시설은,
        <br />
      </div>
      <div className="facilities__div">
        <div className="facilities" name="water" id="water" />
        <p>정수기</p>
      </div>
      <div className="facilities__div">
        <div className="facilities" name="shower" id="shower" />
        <p>샤워실</p>
      </div>
      <div className="facilities__div">
        <div className="facilities" name="scoreboard" id="scoreboard" />
        <p>점수판& 호루라기</p>
      </div>
      <div className="facilities__div">
        <div className="facilities" name="parking" id="parking" />
        <p>주차장</p>
      </div>
      <div className="facilities__div">
        <div className="facilities" name="basketball" id="basketball" />
        <p>농구장 대여</p>
      </div>
      <div className="facilities__div">
        <div className="facilities" name="airconditioner" id="airconditioner" />
        <p>에어컨</p>
      </div>
    </div>
  );
};

export default GymInfo;
