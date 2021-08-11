import React, { useContext, useEffect, useState } from 'react';
import './GameDetail.css';
import GymInfo from 'components/game/GymInfo';
import TeamInfo from 'components/game/TeamInfo';
import GameInfo from 'components/game/GameInfo';
import GameInfo2 from 'components/game/GameInfo2';
import GameRecord from 'components/game/player/GameRecord';
import GameResult from 'components/game/player/GameResult';
import { gameStore } from 'store/gameStore';
import GameApi from 'api/GameApi';
import UserApi from 'api/UserApi';
import { store } from 'store/store';
import GameDetail__Business from 'components/game/business/GameDetail__Business';

const GameDetail = ({ match, location }) => {
  // PJW - GameData Fetch (현재 백엔드, DB 작업이 진행 중이라 임시로 DummyData 사용)
  // PJW - 시간에 따른 컴포넌트 구성 변경
  const gameStoreData = useContext(gameStore);
  const globalState = useContext(store);
  const { value } = globalState;
  const { aboutGame, gameDispatch } = gameStoreData;
  const { params } = match
  // 체육관 소유주의 비즈니스 계정인지 확인
  const isBusiness = (location.state && aboutGame.gameInfo.gym.businessAuth.email===value.isLogin)? location.state.isBusiness : false
  
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
    
  const [isParticipant, setIsParticipant] = useState(false) // 게임 시작 이후 참가자가 아니면 접근 제한
  
  useEffect(()=>{
    aboutGame.gameParticipantList.forEach((member, idx)=>{
      UserApi.myprofile({email: member.userAuth.email},
        (res) => {
          gameDispatch({ type: 'FETCH_PARTICIPANTS_DETAIL', value: {...res.data, idx, team: member.team} })
        },
        (error) => {
          console.log(error)
        })

        if (member.userAuth.email===value.isLogin && value.userKind === 'player') {
          setIsParticipant(true)
        }
      })
    },[aboutGame.gameParticipantList])

  useEffect(()=>{
    gameDispatch({ type: "UPDATE_GAME_STATE"})
  },[aboutGame.gameInfo])
  
  return (
    <div className="gameDetail">

      <div className="detail__top">
        {aboutGame.gameState===0?<GameInfo />:<GameInfo2 />}
        <div className="gympicture">
          <img src={'/images/basketball_gym.jpg'} alt="gym" />
        </div>
      </div>
      {/* 예약 페이지 */}
      {
        aboutGame.gameState===0?
        <div>
          <GymInfo isBusiness={isBusiness} />
      </div>
      : ""
    }
    {/* 게임 결과 페이지 */}
    {
      isParticipant && aboutGame.gameState>=3?
      <GameResult />
      : ""
    }
    {/* 게임 중 기록 페이지 */}
    {
      isParticipant && aboutGame.gameState>=2?
      <GameRecord />
      : ""
    }
    {/* 게임 시작 1시간 전 팀 정보 페이지 */}
    {
      isParticipant && aboutGame.gameState>=1?
      <div>
        <TeamInfo />
      </div>
      : ""
    }
    {
      isBusiness?
      <GameDetail__Business />
      : ""
    }
  </div>
  );
};
    
export default GameDetail;
    