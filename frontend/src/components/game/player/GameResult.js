import React, { useContext, useEffect, useState } from "react";
import GameReview from "./GameReview";
import "./GameResult.css"
import { gameStore } from 'store/gameStore';
import { store } from "store/store";
import GameApi from "api/GameApi";

const GameResult = () => {
  const gameStoreData = useContext(gameStore);
  const { aboutGame } = gameStoreData;
  const globalState = useContext(store);
  const { value } = globalState;
  // 리뷰 등록 컴포넌트 display 여부
  const [showReview, setShowReview] = useState(false)
  const [closeReview, setCloseReview] = useState(false)

  // 게임 리뷰가 존재하는지 확인
  if (value.isLogin && !closeReview) {
    GameApi.ReviewCheck({gameId: parseInt(aboutGame.gameInfo.id), email: value.isLogin},
    (res)=>{
      if (res.status===204) { // 존재 하는 경우
        setShowReview(false)
      } else if (res.status===200) { // 존재하지 않는 경우
        console.log('show!')
        setShowReview(true)
      }
    },
    (error)=>console.log(error)  
    )
  }

  useEffect(()=>{
    GameApi.saveGameResult({gameId: aboutGame.gameInfo.id},
    res=>console.log(res.data),
    err=>console.log(err)
    )
  },[])

  // 점수 합산 => 누적합 계산
  const game1_team1_totlaScore = aboutGame.gameData.game1_team1_score.reduce((sum, currValue)=>(sum+currValue), 0)
  const game1_team2_totlaScore = aboutGame.gameData.game1_team2_score.reduce((sum, currValue)=>(sum+currValue), 0)
  const game2_team1_totlaScore = aboutGame.gameData.game2_team1_score.reduce((sum, currValue)=>(sum+currValue), 0)
  const game2_team2_totlaScore = aboutGame.gameData.game2_team2_score.reduce((sum, currValue)=>(sum+currValue), 0)
  const game3_team1_totlaScore = aboutGame.gameData.game3_team1_score.reduce((sum, currValue)=>(sum+currValue), 0)
  const game3_team2_totlaScore = aboutGame.gameData.game3_team2_score.reduce((sum, currValue)=>(sum+currValue), 0)

  // 승패 계산
  const teamA_win = (game1_team1_totlaScore>game1_team2_totlaScore) + (game3_team2_totlaScore>game3_team1_totlaScore)
  const teamA_lose = (game1_team1_totlaScore<game1_team2_totlaScore) + (game3_team2_totlaScore<game3_team1_totlaScore)
  const teamB_win = (game1_team2_totlaScore>game1_team1_totlaScore) + (game2_team1_totlaScore>game2_team2_totlaScore)
  const teamB_lose = (game1_team2_totlaScore<game1_team1_totlaScore) + (game2_team1_totlaScore<game2_team2_totlaScore)
  const teamC_win = (game3_team1_totlaScore>game3_team2_totlaScore) + (game2_team2_totlaScore>game2_team1_totlaScore)
  const teamC_lose = (game3_team1_totlaScore<game3_team2_totlaScore) + (game2_team2_totlaScore<game2_team1_totlaScore)

  return (
    <div className="result__container">
      { showReview ? (
        <GameReview setShowReview={setShowReview} setCloseReview={setCloseReview} />
        ) : ("")}
      <div>
        경기결과
      </div>
      <div className="gameResult__tables">
        <div className="gameResult__totalScore">
          { aboutGame.gameData.gameType === 2 ? (
            <div className="gameResult__2">
            <table className="RecordTable">
              <th>A팀</th>
              <th>B팀</th>
              <tr>
                <td>{ game1_team1_totlaScore }</td>
                <td>{ game1_team2_totlaScore }</td>
              </tr>
            </table>
          </div>
          ):(
            <div className="gameResult__3">
          <table className="RecordTable">
            <th>AvsB</th>
            <th>BvsC</th>
            <th>CvsA</th>
            <tr>
              <td>{ `${game1_team1_totlaScore} : ${game1_team2_totlaScore}` }</td>
              <td>{ `${game2_team1_totlaScore} : ${game2_team2_totlaScore}` }</td>
              <td>{ `${game3_team1_totlaScore} : ${game3_team2_totlaScore}` }</td>
            </tr>
          </table>
          </div>
          )}
        </div>
        <p>승패결과</p>
        <div className="gameResult__winORlose">
          { aboutGame.gameData.gameType === 2 ? (
            <div className="gameResult__2">
            <table className="RecordTable">
              <th>A팀</th>
              <th>B팀</th>
              <tr>
                <td>{ `${teamA_win}승 ${teamA_lose}패` }</td>
                <td>{ `${teamB_win}승 ${teamB_lose}패`}</td>
              </tr>
            </table>
          </div>
          ):(
            <div className="gameResult__3">
          <table className="RecordTable">
            <th>A팀</th>
            <th>B팀</th>
            <th>C팀</th>
            <tr>
              <td>{ `${teamA_win}승 ${teamA_lose}패` }</td>
              <td>{ `${teamB_win}승 ${teamB_lose}패` }</td>
              <td>{ `${teamC_win}승 ${teamC_lose}패` }</td>
            </tr>
          </table>
          </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default GameResult;