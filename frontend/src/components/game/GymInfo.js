import React, { useEffect, useState } from 'react';
import './GymInfo.css';

const GymInfo = () => {
  // 픽업게임 상세보기에서 체육관 정보를 보여주는 컴포넌트

  const [water, setWater] = useState(true);
  const [shower, setShower] = useState(false);
  const [scoreboard, setScoreboard] = useState(true);
  const [parking, setParking] = useState(true);
  const [basketball, setBasketball] = useState(true);
  const [airconditioner, setAirconditioner] = useState(false);

  useEffect(() => {
    if (!water) {
      document.querySelector('#water').classList.add('no')
    }
    if (!shower) {
      document.querySelector('#shower').classList.add('no');
    }
    if (!scoreboard) {
      document.querySelector('#scoreboard').classList.add('no');
    }
    if (!parking) {
      document.querySelector('#parking').classList.add('no');
    }
    if (!basketball) {
      document.querySelector('#basketball').classList.add('no');
    }
    if (!airconditioner) {
      document.querySelector('#airconditioner').classList.add('no');
    }
  });

  return (
    <div className="gymInfo">
      <p>저희 경기장의 코트 규격은, <span>28m x 15m</span> 입니다.</p>
      <p>편의시설은,</p>
      <div className="facilities__container">
        <div className="waterbox">
          <div className="facility" name="water" id="water" />
          <p>정수기</p>
        </div>
        <div className="showerbox">
          <div className="facility" name="shower" id="shower" />
          <p>샤워실</p>
        </div>
        <div className="scoreboardbox">
          <div className="facility" name="scoreboard" id="scoreboard" />
          <p>점수판 & 휘슬</p>
        </div>
        <div className="parkingbox">
          <div className="facility" name="parking" id="parking" />
          <p>주차장</p>
        </div>
        <div className="basketballbox">
          <div className="facility" name="basketball" id="basketball" />
          <p>농구공</p>
        </div>
        <div className="airconditionerbox">
          <div className="facility" name="airconditioner" id="airconditioner" />
          <p>에어컨 & 난방</p>
        </div>
      </div>
    </div>
  );
};

export default GymInfo;
