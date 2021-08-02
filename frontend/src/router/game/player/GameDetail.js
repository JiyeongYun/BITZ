import React from 'react';
import './GameDetail.css';
import GymInfo from 'components/game/GymInfo';
import GameInfo from 'components/game/GameInfo';

const GameDetail = () => {
  // 픽업 게임 상세 내역 보여주는 컴포넌트
  return (
    <div className="gameDetail">
      <div className="detail__top">
        <GameInfo />
        <div className="gympicture">
          <img src={'/images/gym.jpg'} alt="gym" />
        </div>
      </div>
      <GymInfo />
    </div>
  );
};

export default GameDetail;
