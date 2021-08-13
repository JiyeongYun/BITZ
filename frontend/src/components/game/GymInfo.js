import React, { useContext, useEffect, useState } from 'react';
import './GymInfo.css';
import { gameStore } from 'store/gameStore';
import { useHistory, useRouteMatch  } from 'react-router-dom';
import { store } from 'store/store';
import GameApi from 'api/GameApi';

const GymInfo = ({ isBusiness }) => {
  const gameStoreData = useContext(gameStore);
  const { aboutGame } = gameStoreData;
  const { parking, shower, airconditional, water, basketball, scoreboard } = aboutGame.gameInfo.gym
  const history = useHistory();
  const match = useRouteMatch();
  const globalState = useContext(store);
  const { value } = globalState;
  const { isLogin } = value
  const { params } = match

  // 픽업게임 상세보기에서 체육관 정보를 보여주는 컴포넌트

  useEffect(() => {
    if (!water) {
      document.querySelector('#water').classList.add('no')
    }
    if (!shower) {
      document.querySelector('#shower').classList.add('no');
    }
    if (!scoreboard) {
      document.querySelector('#scoreboard').classList.add('no');
    }
    if (!parking) {
      document.querySelector('#parking').classList.add('no');
    }
    if (!basketball) {
      document.querySelector('#basketball').classList.add('no');
    }
    if (!airconditional) {
      document.querySelector('#airconditioner').classList.add('no');
    }
  });

  const reserveGame = () => {
    console.log({
      "userEmail": isLogin,
      "gameId": params.gameId
      })
    GameApi.reserveGame({
      "userEmail": isLogin,
      "gameId": params.gameId
      },
      ()=>{
        history.push(`/detail/${aboutGame.gameInfo.id}/reservation`)
      },
      (error)=>{console.log(error)}
    )
  }

  // PJW - 예약 완료 여부 확인
  const [isFull, setIsFull] = useState(false)
  useEffect(()=>{
    setIsFull(aboutGame.gameParticipantList.length === aboutGame.gameInfo.maxPeople)
  },[aboutGame.gameParticipantList, aboutGame.gameInfo])

  // PJW - 로그인 없이 예약하기 버튼을 눌렀음
  const needLogin = () => {
    alert('예약을 하려면 로그인을 해주세요!')
  }

  return (
    <div className="gymInfo">
      <p>저희 경기장의 코트 규격은, <span>28m x 15m</span> 입니다.</p>
      <p>편의시설은,</p>
      <div className="facilities__container">
        <div className="waterbox">
          <div className="facility" name="water" id="water" />
          <p>정수기</p>
        </div>
        <div className="showerbox">
          <div className="facility" name="shower" id="shower" />
          <p>샤워실</p>
        </div>
        <div className="scoreboardbox">
          <div className="facility" name="scoreboard" id="scoreboard" />
          <p>점수판 & 휘슬</p>
        </div>
        <div className="parkingbox">
          <div className="facility" name="parking" id="parking" />
          <p>주차장</p>
        </div>
        <div className="basketballbox">
          <div className="facility" name="basketball" id="basketball" />
          <p>농구공</p>
        </div>
        <div className="airconditionerbox">
          <div className="facility" name="airconditioner" id="airconditioner" />
          <p>에어컨 & 난방</p>
        </div>
      </div>
      <div className="gym__footer">
        <div className="left">
          <p>특이사항</p>
          <ul>
            <li>오픈 기념으로 이벤트 가격입니다.</li>
            <li>많이들 참여해주세요~</li>
          </ul>
        </div>
        <div className="right">
          <p>관리자 정보</p>
          <ul>
            <li>권오우 010-1122-1122</li>
          </ul>
          <p>체육관 리뷰</p>
          <ul>
            <li>시설</li>
            <li>친절</li>
          </ul>
        </div>
      </div>
      { !isBusiness?
        <div>
        { isFull?
          <button className="reservation__btn">모집완료</button> :
          (
            isLogin?
            <button className="reservation__btn" onClick={reserveGame}>예약하기</button> :
            <button className="reservation__btn" onClick={needLogin}>예약하기</button>       
          )
        }
        </div> : <div></div> 
      }
    </div>
  );
};

export default GymInfo;