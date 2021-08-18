import React from 'react';
import './Score.css';

const Score = ({ userData }) => {
  // 실력점수와 매너점수를 보여주는 컴포넌트
  const { manner, skill } = userData;

  return (
    <div class="score__container">
      <div className="match__container">
        <div className="manner_box">
          <div className="logo">
            <img src="/images/manner_logo.png" alt="manner_logo" />
          </div>
          <p>{manner}</p>
          <p>MANNER</p>
        </div>
        <div className="score_box">
          <div className="logo">
            <img src="/images/skill_logo.png" alt="manner_logo" />
          </div>
          <p>{skill}</p>
          <p>SKILL</p>
        </div>
      </div>
      <div className="match_result">
        <h3>내 전적</h3>
        <div classname="score_history">
          {userData.winCnt + ' 승  ' + userData.tieCnt + ' 무  ' + userData.loseCnt + ' 패  '}
        </div>
      </div>
    </div>
  );
};

export default Score;
