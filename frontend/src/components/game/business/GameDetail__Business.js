import React, { useContext } from "react"
import { gameStore } from 'store/gameStore';
import "./GameDetail__Business.css"

function GameDetail__Business () {
  const gameStoreData = useContext(gameStore);
  const { aboutGame, gameDispatch } = gameStoreData;
  console.log('두근', aboutGame.gameParticipantDetails)
  const translator = {
    COMPLETE : "확정",
    WAITING : "대기중",
    ON_DEPOSIT : "입금중"
  }

  return (
  <div className="GameDatail__Business">
    <div className="GameDatail__Business_top">
      <span>미리보기</span> | <span>인원 관리</span>
    </div>
    <table className="GameDatail__Business_table">
      <thead>
        <th>프로필</th>
        <th>이름</th>
        <th>포지션</th>
        <th>신장</th>
        <th>매너점수</th>
        <th>상태</th>
        <th>명단 관리</th>
      </thead>
      <tbody>
        {aboutGame.gameParticipantList.map((participant, idx)=>{
          console.log(participant, idx)
          return (
            <tr>
              <td><img src='/images/symbol.png' alt="profile" /></td>
              <td>{aboutGame.gameParticipantDetails[idx]? aboutGame.gameParticipantDetails[idx].name : ""}</td>
              <td className="GameDatail__Business_table_Position">
                {aboutGame.gameParticipantDetails[idx]? (aboutGame.gameParticipantDetails[idx].guard? <div>g</div> : "") : ""}
                {aboutGame.gameParticipantDetails[idx]? (aboutGame.gameParticipantDetails[idx].forward? <div>f</div> : "") : ""}
                {aboutGame.gameParticipantDetails[idx]? (aboutGame.gameParticipantDetails[idx].center? <div>c</div> : "") : ""}
              </td>
              <td>{aboutGame.gameParticipantDetails[idx]? aboutGame.gameParticipantDetails[idx].height : ""}</td>
              <td>데이터X</td>
              <td>{translator[participant.state]}</td>
              <td className="GameDatail__Business_table_Roster">
                {participant.state === "COMPLETE"? <div>내보내기</div>:""}
                {participant.state === "WAITING"? <div><span>V</span><span>X</span></div>:""}
                {participant.state === "ON_DEPOSIT"? <div>X</div>:""}
              </td>
            </tr>
            )
          })}
      </tbody>
    </table>
  </div>
  )
}

export default GameDetail__Business