import React, { useContext } from 'react';
import './GameInfo.css';
import { gameStore } from 'store/gameStore';

const GameInfo = () => {
  const gameStoreData = useContext(gameStore);
  const { aboutGame } = gameStoreData;
  // 픽업게임에 대한 정보를 보여주는 컴포넌트

const time = new Date()
time.setTime(aboutGame.gameInfo.date)
const day = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]

  // 복사
  const copyAddress = () => {
    const textarea = document.createElement("textarea")
    textarea.value = aboutGame.gameInfo.gym.address
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand("copy")
    document.body.removeChild(textarea)
    alert("주소가 복사되었습니다.")
  }

  return (
    <div className="gameInfo">
      <div className="gamedate">
        {/* {new Date(aboutGame.gameInfo.date)} */}
        <p>{time.getFullYear()}년 {time.getMonth()+1}월 {time.getDate()}일 {day[time.getDay()]}</p>
        <p>{aboutGame.gameInfo.startTime.substr(0,5)} ~ {aboutGame.gameInfo.endTime.substr(0,5)}</p>
      </div>
      <div className="gyminfo">
        <p id="gymname">{aboutGame.gameInfo.gym.name}</p>
        <p id="gymaddress">{aboutGame.gameInfo.gym.address} | <button onClick={copyAddress}>주소복사</button></p> 
      </div>
      <div className="gameuser">
        <p>모집 인원 {aboutGame.gameInfo.minPeople}~{aboutGame.gameInfo.maxPeople}명</p>
        <p>경기 인원은 <span>{aboutGame.gameParticipantList.length}</span> 명 입니다.</p>
        {/* <p>총 9쿼터 진행 예정</p> */}
        <p>쿼터 당 경기 시간은 <span>10</span> 분 입니다.</p>
      </div>
    </div>
  );
};

export default GameInfo;
