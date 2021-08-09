import React, { useContext, useEffect } from 'react';
import './GameDetail.css';
import GymInfo from 'components/game/GymInfo';
import TeamInfo from 'components/game/TeamInfo';
import GameInfo from 'components/game/GameInfo';
import GameInfo2 from 'components/game/GameInfo2';
import GameRecord from 'components/game/player/GameRecord';
import GameResult from 'components/game/player/GameResult';
import { gameStore } from 'store/gameStore';
import GameApi from 'api/GameApi';

const GameDetail = ({ match }) => {
  // PJW - GameData Fetch (현재 백엔드, DB 작업이 진행 중이라 임시로 DummyData 사용)
  // PJW - 시간에 따른 컴포넌트 구성 변경
  const gameStoreData = useContext(gameStore);
  const { aboutGame, gameDispatch } = gameStoreData;
  const { params } = match
  useEffect(()=>{
    GameApi.requsetGame(params,
      res => {
        // 해당 날짜에 게임 리스트를 data에 담음
        gameDispatch({ type: "FETCH_GAME_DATA", value: res.data })
      },
      err => console.log(err)
      )
    },[gameDispatch])
    // 픽업 게임 상세 내역 보여주는 컴포넌트

  useEffect(()=>{
    gameDispatch({ type: "UPDATE_GAME_STATE"})
  },[aboutGame.gameInfo])
  
  return (
    <div className="gameDetail">

      <div className="detail__top">
        {aboutGame.gameState===0?<GameInfo />:<GameInfo2 />}
        <div className="gympicture">
          <img src={'/images/gym.jpg'} alt="gym" />
        </div>
      </div>
      {/* 예약 페이지 */}
      {
        aboutGame.gameState===0?
        <div>
          <GymInfo />
      </div>
      : ""
    }
    {/* 게임 결과 페이지 */}
    {
      aboutGame.gameState>=3?
      <GameResult />
      : ""
    }
    {/* 게임 중 기록 페이지 */}
    {
      aboutGame.gameState>=2?
      <GameRecord />
      : ""
    }
    {/* 게임 시작 1시간 전 팀 정보 페이지 */}
    {
      aboutGame.gameState>=1?
      <div>
        <TeamInfo />
      </div>
      : ""
    }
      </div>
      );
    };
    
    export default GameDetail;
    