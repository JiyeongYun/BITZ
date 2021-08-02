import React, { useState } from "react";
import "./GameResult.css"

const GameResult = ({ gameData }) => {
  const game1_team1_totlaScore = gameData.game1_team1_score.reduce((sum, currValue)=>(sum+currValue))
  const game1_team2_totlaScore = gameData.game1_team2_score.reduce((sum, currValue)=>(sum+currValue))
  const game2_team1_totlaScore = gameData.game2_team1_score.reduce((sum, currValue)=>(sum+currValue))
  const game2_team2_totlaScore = gameData.game2_team2_score.reduce((sum, currValue)=>(sum+currValue))
  const game3_team1_totlaScore = gameData.game3_team1_score.reduce((sum, currValue)=>(sum+currValue))
  const game3_team2_totlaScore = gameData.game3_team2_score.reduce((sum, currValue)=>(sum+currValue))

  const teamA_win = (game1_team1_totlaScore>game1_team2_totlaScore) + (game3_team2_totlaScore>game3_team1_totlaScore)
  const teamA_lose = (game1_team1_totlaScore<game1_team2_totlaScore) + (game3_team2_totlaScore<game3_team1_totlaScore)
  const teamB_win = (game1_team2_totlaScore>game1_team1_totlaScore) + (game2_team1_totlaScore>game2_team2_totlaScore)
  const teamB_lose = (game1_team2_totlaScore<game1_team1_totlaScore) + (game2_team1_totlaScore<game2_team2_totlaScore)
  const teamC_win = (game3_team1_totlaScore>game3_team2_totlaScore) + (game2_team2_totlaScore>game2_team1_totlaScore)
  const teamC_lose = (game3_team1_totlaScore<game3_team2_totlaScore) + (game2_team2_totlaScore<game2_team1_totlaScore)

  return (
    <div>
      <div>
        결과
      </div>
      <div className="gameResult__tables">
        <div className="gameResult__totalScore">
          { gameData.gameType === 2 ? (
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
            <th>A팀 vs B팀</th>
            <th>B팀 vs C팀</th>
            <th>C팀 vs A팀</th>
            <tr>
              <td>{ `${game1_team1_totlaScore} : ${game1_team2_totlaScore}` }</td>
              <td>{ `${game2_team1_totlaScore} : ${game2_team2_totlaScore}` }</td>
              <td>{ `${game3_team1_totlaScore} : ${game3_team2_totlaScore}` }</td>
            </tr>
          </table>
          </div>
          )}
        </div>
        <div className="gameResult__winORlose">
          { gameData.gameType === 2 ? (
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