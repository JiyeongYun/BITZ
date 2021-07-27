import React from 'react';
import './GameDetail.css';
import GymInfo from 'components/game/GymInfo';
import GameInfo from 'components/game/GameInfo';

const GameDetail = () => {
  // 픽업 게임 상세 내역 보여주는 컴포넌트
  return (
    <div className="gameDetail">
      <GameInfo />
      <div className="gameInfo">
        <img src={process.env.PUBLIC_URL + '/images/gym.jpg'} alt="gym" width="700px" />
      </div>
      <GymInfo />
      <hr className="gameDetail__hr" />
      <div className="gameDetail__footer footer_left">
        <h1>특이사항</h1>
        <ul>
          <li>오픈 기념으로 이벤트가 가격입니다.</li>
          <li>많이들 참여해주세요 ~</li>
        </ul>
      </div>
      <div className="gameDetail__footer">
        <div className="gameDetail__footer__inner">
          <h1>관리자 정보</h1>
          권오우 010-1122-2233
        </div>
        <div className="gameDetail__footer__inner">
          <h1>체육관 정보</h1>
          시설
          <br />
          친절
        </div>
      </div>
      <hr className="gameDetail__hr" />
      <button className="reservation__btn">예약하기</button>
    </div>
  );
};

export default GameDetail;
