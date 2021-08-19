import React, { useContext } from 'react';
import './GameInfo.css';
import Participant from './Participant';
import { gameStore } from 'store/gameStore';

const GameInfo = () => {
  const gameStoreData = useContext(gameStore);
  const { aboutGame } = gameStoreData;
  const users = aboutGame.gameParticipantList
  // 픽업게임에 대한 정보를 보여주는 컴포넌트

  const time = new Date()
  time.setTime(aboutGame.gameInfo.date)
  const day = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]

  // 복사
  const copyAddress = () => {
    const textarea = document.createElement("textarea")
    textarea.value = aboutGame.gameInfo.gym.sido + " " + aboutGame.gameInfo.gym.gugun + " " + aboutGame.gameInfo.gym.address
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand("copy")
    document.body.removeChild(textarea)
    alert("주소가 복사되었습니다.")
  }

  return (
    <div className="gameInfo">
      <div className="gamedate">
        <p>{time.getFullYear()}년 {time.getMonth()+1}월 {time.getDate()}일 {day[time.getDay()]}</p>
        <p>{aboutGame.gameInfo.startTime.substr(0,5)} ~ {aboutGame.gameInfo.endTime.substr(0,5)}</p>
      </div>
      <div className="gyminfo">
        <p id="gymname">{aboutGame.gameInfo.gym.name}</p>
        <p id="gymaddress">{aboutGame.gameInfo.gym.sido} {aboutGame.gameInfo.gym.gugun} {aboutGame.gameInfo.gym.address} | <button onClick={copyAddress}>주소복사</button></p> 
      </div>
      <div className="gameuser">
        <p>모집 인원 {aboutGame.gameInfo.minPeople}~{aboutGame.gameInfo.maxPeople}명</p>
        <p>현재 모인 인원은 <span>{aboutGame.gameParticipantList.length}</span> 명 입니다.</p>
        <p>참가비 <span>{aboutGame.gameInfo.participationFee}</span> 원</p>
      </div>

      {/* 참여자들 정보 및 프로필 사진 */}
      <div className="participants">
        {users.map((user, idx) => {
          return (
            <Participant 
              key={idx}
              id={user.id}
              user={user}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GameInfo;
