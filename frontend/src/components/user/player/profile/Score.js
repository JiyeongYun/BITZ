import React from 'react';
import './Score.css';

const Score = ({ userObj }) => {
  // 실력점수와 매너점수를 보여주는 컴포넌트
  return (
    <div className="match__container">
      <div className="score__box">
        <div className="manner">
          <p>매너 점수</p>
          <p>4.5</p>
          <div className="manner__score">
            <img src="/images/basketball_purple.png" />
            <img src="/images/basketball_purple.png" />
            <img src="/images/basketball_purple.png" />
            <img src="/images/basketball_purple.png" />
            <img src="/images/basketball_black.png" />
          </div>
        </div>
        <div className="skill">
          <p>실력 점수</p>
          <p>100 점</p>
          <div className="skill__score">
            <div className="scorebox"></div>
            <div className="scorebox"></div>
            <div className="scorebox"></div>
            <div className="scorebox"></div>
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
