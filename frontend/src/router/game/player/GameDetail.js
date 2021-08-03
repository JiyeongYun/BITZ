import React, { useContext, useEffect } from 'react';
import './GameDetail.css';
import GymInfo from 'components/game/GymInfo';
import TeamInfo from 'components/game/TeamInfo';
import GameInfo from 'components/game/GameInfo';
import GameInfo2 from 'components/game/GameInfo2';
import GameRecord from 'components/game/player/GameRecord';
import GameResult from 'components/game/player/GameResult';
import { gameStore } from 'store/gameStore';
import gameDataDummy from 'store/gameDataDummy';

const GameDetail = () => {
  // PJW - GameData Fetch (현재 백엔드, DB 작업이 진행 중이라 임시로 DummyData 사용)
  // PJW - 시간에 따른 컴포넌트 구성 변경
  const gameStoreData = useContext(gameStore);
  const { aboutGame, gameDispatch } = gameStoreData;
  useEffect(()=>{
    gameDispatch({ type: "FETCH_GAME_DATA", value: gameDataDummy })
    gameDispatch({ type: "UPDATE_GAME_STATE" })
  },[])
  // 픽업 게임 상세 내역 보여주는 컴포넌트


  // 임시 데이터 변경 (테스트 용)
  const changeTestTime = (event) => {
    gameDispatch({ type: "TEST_CHANGE_TIME", value: event.target })
    console.log(aboutGame.gameInfo)
    gameDispatch({ type: "UPDATE_GAME_STATE" })
  }

  return (
    <div className="gameDetail">
      {/* 시간 변경 테스트 */}
      <div id="TEST_TIME">
        테스트 데이터(게임 시작/종료 시각) - 현재시간 기준
        <br />시작 전 1시간 초과 : 게임 정보
        <br />시작 전 1시간 이하 : 팀 정보
        <br />게임 중 : 기록 입력
        <br />종료 후 1시간 이하 : 결과 & 추가 입력
        <br />종료 후 1시간 초과 : 결과 Fix
        <div>
          시작 
          <input name="startTime.month" value={aboutGame.gameInfo.startTime.month} onChange={changeTestTime} />
          월
          <input name="startTime.date" value={aboutGame.gameInfo.startTime.date} onChange={changeTestTime} />
          일
          <input name="startTime.hour" value={aboutGame.gameInfo.startTime.hour} onChange={changeTestTime} />
          시
          <input name="startTime.minute" value={aboutGame.gameInfo.startTime.minute} onChange={changeTestTime} />
          분
        </div>
        <div>
          끝 
          <input name="endTime.month" value={aboutGame.gameInfo.endTime.month} onChange={changeTestTime} />
          월
          <input name="endTime.date" value={aboutGame.gameInfo.endTime.date} onChange={changeTestTime} />
          일
          <input name="endTime.hour" value={aboutGame.gameInfo.endTime.hour} onChange={changeTestTime} />
          시
          <input name="endTime.minute" value={aboutGame.gameInfo.endTime.minute} onChange={changeTestTime} />
          분
        </div>
      </div>

      <div className="detail__top">
        {gameState===0?<GameInfo />:<GameInfo2 />}
        <div className="gympicture">
          <img src={'/images/gym.jpg'} alt="gym" />
        </div>
      </div>
      {/* 예약 페이지 */}
      {
        aboutGame.gameInfo.gameState===0?
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
      aboutGame.gameInfo.gameState===1?
      <div>
        게임 1시간 전 팀 정보
      </div>
      : ""
    }
    {/* 게임 결과 페이지 */}
    {
      aboutGame.gameInfo.gameState>=3?
      <div>
        <GameResult />
        <TeamInfo />
      </div>
      : ""
    }
    {/* 게임 중 기록 페이지 */}
    {
      aboutGame.gameInfo.gameState>=2?
      <div>
        <GameRecord />
        <TeamInfo />
      </div>
      : ""
    }
      </div>
      );
    };
    
    export default GameDetail;
    