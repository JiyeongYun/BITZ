import React, { useEffect, useState } from 'react';
import './GameDetail.css';
import GymInfo from 'components/game/GymInfo';
import GameInfo from 'components/game/GameInfo';
import GameRecord from 'components/game/player/GameRecord';

const GameDetail = () => {
  // 픽업 게임 상세 내역 보여주는 컴포넌트

  // PJW - 게임 데이터를 가져오는 함수 필요
  const [gameData, setGameData] = useState({
    gameType: 2, // 2: 2팀, 3: 3팀
    game1_team1_score: [11, 24, 36],
    game1_team2_score: [13, 24, 35],
    game2_team1_score: [15, 17, 14],
    game2_team2_score: [16, 16, 14],
    game3_team1_score: [20, 22],
    game3_team2_score: [18, 29],
    game1_recorder: ['권오우', '박정웅', '윤지영'], // 2팀 게임은 game1만 사용
    game2_recorder: ['장현웅', '이소은', '권오우'],
    game3_recorder: ['비츠', '싸피'],
  })

  // 임시 데이터
  const [tempGameData, setTempGameData] = useState({
    startTime: {
      year: 2021,
      month: 8,
      date: 2,
      hour: 17,
      minute: 15
    },
    endTime: {
      year: 2021,
      month: 8,
      date: 3,
      hour: 20,
      minute: 15
    },
    type: 2
  })
  // 임시 데이터 변경 (테스트 용)
  const changeTestTime = (event) => {
    const { name, value } = event.target;
    const name1 = name.split('.')[0]
    const name2 = name.split('.')[1]
    setTempGameData({...tempGameData, [name1]: {...tempGameData[name1], [name2]: parseInt(value)}});
  }

  // PJW - 시간에 따른 페이지 변경
  const [gameState, setGameState] = useState(0) // 0: 예약 페이지, 1: 게임 1시간 전 팀 정보 페이지, 2: 게임 시작 중, 3: 게임 종료
  useEffect(()=>{
    setGameState(0) // 테스트 용 (나중에 지우기)
    const current_time = new Date();
    const current_year = current_time.getFullYear();
    const current_month = current_time.getMonth()+1;
    const current_date = current_time.getDate();
    const current_hour = current_time.getHours();
    const current_minutes = current_time.getMinutes();
    // 게임 준비
    if ((current_year==tempGameData.startTime.year && current_month==tempGameData.startTime.month && current_date==tempGameData.startTime.date && current_hour==tempGameData.startTime.hour-1 && current_minutes>=tempGameData.startTime.minute) ||
    (current_year==tempGameData.startTime.year && current_month==tempGameData.startTime.month && current_date==tempGameData.startTime.date && current_hour>tempGameData.startTime.hour-1)) {
      setGameState(1)
    }
    // 게임 중
    if ((current_year==tempGameData.startTime.year && current_month==tempGameData.startTime.month && current_date==tempGameData.startTime.date && current_hour==tempGameData.startTime.hour && current_minutes>=tempGameData.startTime.minute) ||
    (current_year==tempGameData.startTime.year && current_month==tempGameData.startTime.month && current_date==tempGameData.startTime.date && current_hour>tempGameData.startTime.hour)) {
      setGameState(2)
    }
    // 게임 종료
    if ((current_year>tempGameData.endTime.year) || 
    (current_year==tempGameData.startTime.year && current_month>tempGameData.endTime.month) ||
    (current_year==tempGameData.startTime.year && current_month==tempGameData.endTime.month && current_date>tempGameData.endTime.date) ||
    (current_year==tempGameData.startTime.year && current_month==tempGameData.endTime.month && current_date==tempGameData.endTime.date && current_hour>tempGameData.endTime.hour) ||
    (current_year==tempGameData.startTime.year && current_month==tempGameData.endTime.month && current_date==tempGameData.endTime.date && current_hour==tempGameData.endTime.hour && current_minutes>tempGameData.endTime.minute)) {
      setGameState(3)
    }
  })

  return (
    <div className="gameDetail">
      {/* 시간 변경 테스트 */}
      <div id="TEST_TIME">
        <div>
          시작 월
          <input name="startTime.month" value={tempGameData.startTime.month} onChange={changeTestTime} />
          시작 일
          <input name="startTime.date" value={tempGameData.startTime.date} onChange={changeTestTime} />
          시작 시
          <input name="startTime.hour" value={tempGameData.startTime.hour} onChange={changeTestTime} />
          시작 분
          <input name="startTime.minute" value={tempGameData.startTime.minute} onChange={changeTestTime} />
        </div>
        <div>
          끝 월
          <input name="endTime.month" value={tempGameData.endTime.month} onChange={changeTestTime} />
          끝 일
          <input name="endTime.date" value={tempGameData.endTime.date} onChange={changeTestTime} />
          끝 시
          <input name="endTime.hour" value={tempGameData.endTime.hour} onChange={changeTestTime} />
          끝 분
          <input name="endTime.minute" value={tempGameData.endTime.minute} onChange={changeTestTime} />
        </div>
      </div>
      <div className="detail__top">
        <GameInfo />
        <div className="gympicture">
          <img src={'/images/gym.jpg'} alt="gym" />
        </div>
      </div>
      {/* 예약 페이지 */}
      {
        gameState==0?
        <div>
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
      : ""
    }
    {/* 게임 시작 1시간 전 팀 정보 페이지 */}
    {
      gameState==1?
      <div>
        게임 1시간 전 팀 정보
      </div>
      : ""
    }
    {/* 게임 중 기록 페이지 */}
    {
      gameState==2?
      <GameRecord gameData={gameData} setGameData={setGameData} />
      : ""
    }
    {/* 게임 후 리뷰 페이지 */}
    {
      gameState==3?
      <div>
        리뷰 페이지
      </div>
      : ""
    }
      </div>
      );
    };
    
    export default GameDetail;
    