import React, { useEffect } from 'react';
import './Score.css';

const Score = ({ userData }) => {
  // 실력점수와 매너점수를 보여주는 컴포넌트
  const {manner, skill}= userData

  // manner 점수와 스킬점수에 따라 색상 혹은 위치 변경
  useEffect(() => {
    const manner_div = document.querySelector(".manner__score")
    const ball = document.querySelector(".ball")

    if (0 <= manner && manner < 10) {
      manner_div.style.backgroundColor = 'red'
    } else if (10 <= manner && manner < 20) {
      manner_div.style.backgroundColor = 'orange'
    } else if (20 <= manner && manner < 30) {
      manner_div.style.backgroundColor = 'green'
    } else if (30 <= manner && manner < 40) {
      manner_div.style.backgroundColor = 'blue'
    } else {
      manner_div.style.backgroundColor = 'violet'
    }
    
    let location = 0
    if (skill < 3) {
      location = 3
    } else if ( skill > 96) {
      location = 96
    } else {
      location = skill
    }

    ball.style.left = `${location}%`
  }, [manner, skill])

  return (
    <div className="match__container">
      <div className="score__box">
        <div className="manner">
          <p>매너 점수</p>
          <div className="manner__score"></div>
        </div>
        <div className="skill">
          <p>실력 점수</p>
          <div className="skill__score">
            <div className="scorebox"></div>
            <div className="scorebox"></div>
            <div className="scorebox"></div>
            <div className="scorebox"></div>
            <img className="ball" src="/images/basketball.png" />
          </div>
        </div>
      </div>
      <div className="match__result">
        <h2>경기 결과</h2>
      </div>
    </div>
  );
};

export default Score;
