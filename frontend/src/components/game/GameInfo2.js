import React from 'react';
import './GameInfo.css';

const GameInfo = () => {
  // 픽업게임에 대한 정보를 보여주는 컴포넌트

  // 체육관 정보
  const gymInfo = {
    name: "역삼 싸피 체육관",
    address: "서울시 강남구 역삼동 테헤란로 212"
  }

  // 복사
  const copyAddress = () => {
    const textarea = document.createElement("textarea")
    textarea.value = gymInfo.address
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand("copy")
    document.body.removeChild(textarea)
    alert("주소가 복사되었습니다.")
  }

  return (
    <div className="gameInfo">
      <div className="gamedate">
        <p>2021년 7월 21일 수요일</p>
        <p>10:00 ~ 12:00</p>
      </div>
      <div className="gyminfo">
        <p id="gymname">{gymInfo.name}</p>
        <p id="gymaddress">{gymInfo.address} | <button onClick={copyAddress}>주소복사</button></p> 
      </div>
      <div className="gameuser">
        <p>모집 인원 12~18명</p>
        <p>경기 인원은 <span>18 </span> 명 입니다.</p>
        <p>총 9쿼터 진행 예정</p>
        <p>쿼터 당 경기 시간은 <span>10</span> 분 입니다.</p>
      </div>
    </div>
  );
};

export default GameInfo;
