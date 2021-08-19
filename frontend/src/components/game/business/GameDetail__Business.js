import GameApi from "api/GameApi";
import React, { useContext, useState } from "react"
import { gameStore } from 'store/gameStore';
import "./GameDetail__Business.css"
import { useParams } from "react-router-dom"
import GymInfo from "../GymInfo";

function GameDetail__Business () {
  const gameStoreData = useContext(gameStore);
  const { aboutGame, gameDispatch } = gameStoreData;
  const gameId = useParams().gameId

  const translator = {
    COMPLETE : "확정",
    WAITING : "대기중",
    ON_DEPOSIT : "입금중"
  }

  // 미리보기 - 인원관리
  const [manageMode] = useState(true)

  // PJW - 입금 확인 버튼
  const ConfirmReservation = (event) => {
    const data = {
      "userEmail": event.target.id,
      "gameId": gameId
      }
    GameApi.ConfirmReservation(data,
        ()=>{
            alert('예약을 승인했습니다.')
            RenewData()
        },
        (error)=>{console.log(error)
      }
    )
  }

  // PJW - 예약 취소 버튼
  const CancelReservation = (event) => {
    const data = {
      "userEmail": event.target.id,
      "gameId": gameId
      }
    GameApi.cancelReservation(data,
        ()=>{
            alert('예약을 취소했습니다.')
            RenewData()
        },
        (error)=>{console.log(error)
      }
    )
  }

  // PJW - 업데이트 한 정보를 다시 받아오는 콜백 함수 (최신화)
  const RenewData = () => {
    GameApi.requsetGame({gameId},
      res => {
        // 해당 날짜에 게임 리스트를 data에 담음
        gameDispatch({ type: "FETCH_GAME_DATA", value: res.data })
      },
      err => console.log(err)
    )
  }
    
  return (
  <div className="GameDatail__Business">
    {/* <div className="GameDatail__Business_top">
      <span className={manageMode? "activate GameDatail__Business_button" : "GameDatail__Business_button"} onClick={switchManageMode} >인원관리</span> | <span className={!manageMode? "activate GameDatail__Business_button" : "GameDatail__Business_button"} onClick={switchPreviewMode} >미리보기</span>
    </div> */}
    { manageMode? (
      <table className="GameDatail__Business_table">
        <thead>
          <th>이름</th>
          <th>상태</th>
          <th>명단 관리</th>
        </thead>
        <tbody>
          {aboutGame.gameParticipantList.map((participant, idx)=>{
            return (
              <tr>
                <td>{aboutGame.gameParticipantDetails[idx]? aboutGame.gameParticipantDetails[idx].name : ""}</td>
                <td>{translator[participant.state]}</td>
                <td className="GameDatail__Business_table_Roster">
                  {participant.state === "COMPLETE"? <div className="GameDatail__Business_red GameDatail__Business_button" id={participant.userAuth.email} onClick={CancelReservation}>내보내기</div>:""}
                  {participant.state === "WAITING"? <div><span><img className="GameDatail__Business_button" src='/images/check.png' alt="confirm" id={participant.userAuth.email} onClick={ConfirmReservation} /></span><span><img className="GameDatail__Business_button" src='/images/remove.png' alt="remove" id={participant.userAuth.email} onClick={CancelReservation} /></span></div>:""}
                  {participant.state === "ON_DEPOSIT"? <div><img className="GameDatail__Business_button" src='/images/remove.png' alt="remove" id={participant.userAuth.email} onClick={CancelReservation} /></div>:""}
                </td>
              </tr>
              )
            })}
        </tbody>
      </table>
    ):(
      <GymInfo isBusiness={true} />
    )}
  </div>
  )
}

export default GameDetail__Business