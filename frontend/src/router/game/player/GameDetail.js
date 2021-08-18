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
import ImgApi from 'api/ImgApi';

const GameDetail = ({ match, location }) => {
  // KOW - 체육관 사진 url 담을 State
  const [imgUrl, setImgUrl] = useState('');

  // PJW - 시간에 따른 컴포넌트 구성 변경
  const gameStoreData = useContext(gameStore);
  const globalState = useContext(store);
  const { value } = globalState;
  const { aboutGame, gameDispatch } = gameStoreData;
  const { params } = match;

  // State
  // (1) 체육관 소유주의 비즈니스 계정인지 확인 => Gyminfo의 예약 버튼 삭제 & GameDetail_Business 컴포넌트 접근 여부
  const isBusiness =
    location.state && aboutGame.gameInfo.gym.businessAuth.email === value.isLogin
      ? location.state.isBusiness
      : false;
  // (2) 게임 시작 이후 참가자가 아니면 접근 제한
  const [isParticipant, setIsParticipant] = useState(false);

  // KOW - 체육관 사진을 가져오는 함수
  useEffect(() => {
    const params = {
      gymId: aboutGame.gameInfo.gym.id,
    };
    ImgApi.getGymImg(
      params,
      (res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        setImgUrl(url);
      },
      (err) => {
        console.log(err);
      }
    );
  }, [aboutGame]);

  // useEffect
  useEffect(() => {
    // (1) 현재 게임 상태 업데이트
    // 0: 예약 페이지, 1: 게임 1시간 전 팀 정보 페이지, 2: 게임 시작 중, 3: 게임 종료(1시간 동안 기록 가능), 4: 게임 종료(Data Fix)

    // (2) Game 관련 정보 저장
    GameApi.requsetGame(
      params,
      (res) => {
        // aboutGame 업데이트
        gameDispatch({ type: 'FETCH_GAME_DATA', value: res.data });
        gameDispatch({ type: 'UPDATE_GAME_STATE' });
      },
      (err) => console.log(err)
    );
  }, []);

  // (3) Game 참감자 세부 정보 저장
  useEffect(() => {
    // forEach문으로 한 명씩 세부 데이터 저장
    aboutGame.gameParticipantList.forEach((member, idx) => {
      UserApi.myprofile(
        { email: member.userAuth.email },
        (res) => {
          gameDispatch({
            type: 'FETCH_PARTICIPANTS_DETAIL',
            value: { ...res.data, idx, team: member.team },
          });
        },
        (error) => {
          console.log(error);
        }
      );

      // (4) 로그인한 플레이어 유저가 참여자 중 한 명이라면 세부 데이터 접근 허용
      if (member.userAuth.email === value.isLogin && value.userKind === 'player') {
        setIsParticipant(true);
      }
    });
  }, [gameDispatch, aboutGame.gameParticipantList]);

  return (
    <div className="gameDetail">
      <div className="detail__top">
        {aboutGame.gameState === 0 ? <GameInfo /> : <GameInfo2 />}
        <div className="gympicture">
          <img src={imgUrl} alt="gym" />
        </div>
      </div>
      {/* 예약 페이지 */}
      {aboutGame.gameState === 0 ? (
        <div>
          <GymInfo isBusiness={isBusiness} />
        </div>
      ) : (
        ''
      )}
      {/* 게임 결과 페이지 */}
      {isParticipant && aboutGame.gameState >= 3 ? <GameResult /> : ''}
      {/* 게임 중 기록 페이지 */}
      {isParticipant && aboutGame.gameState >= 2 ? <GameRecord /> : ''}
      {/* 게임 시작 1시간 전 팀 정보 페이지 */}
      {isParticipant && aboutGame.gameState >= 1 ? (
        <div>
          <TeamInfo />
        </div>
      ) : (
        ''
      )}
      {isBusiness ? <GameDetail__Business /> : ''}
    </div>
  );
};

export default GameDetail;
