import React from 'react';
import './Score.css';

const Score = ({ userObj }) => {
  // 실력점수와 매너점수를 보여주는 컴포넌트
  return (
    <div className="score">
      <div className="score__box skill">실력점수</div>
      <div className="score__box manner">매너점수</div>
    </div>
  );
};

export default Score;
