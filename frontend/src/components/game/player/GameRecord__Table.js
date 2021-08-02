import React, { useState } from 'react';
import GameRecord__Input2 from './GameRecord__Input2.js';
import './GameRecord__Table.css';

const GameRecord__Table = ({ team1, team2, game, gameData, setGameData }) => {
  const [showInput, setShowInput] = useState(false)
  const team1_score = game+'_team1_score'
  const team2_score = game+'_team2_score'
  const recorder = game+'_recorder'
  const quarters = []
  for (let i=0;i<gameData[recorder].length;i++){
    quarters.push(i)
  }
  // 동시 입력 처리 필요
  const addRecord = ()=>{
    setShowInput(true)
  }
  return (
    <div className="gameRecord__table">
      <table className="RecordTable">
        <th>쿼터</th>
        <th>{team1}팀</th>
        <th>{team2}팀</th>
        <th>기록자</th>
        { quarters.map(quarter=>(<tr>
          <td>{quarter+1}</td>
          <td>{gameData[team1_score][quarter]}</td>
          <td>{gameData[team2_score][quarter]}</td>
          <td>{gameData[recorder][quarter]}</td>
          </tr>))}
        { showInput ? <GameRecord__Input2 game={game} gameData={gameData} setGameData={setGameData} setShowInput={setShowInput} team1={team1} team2={team2} /> : "" }
        <tr onClick={addRecord} className="gameRecord__button"><td colSpan="4">{ !showInput ? '추가' : '등록 중' }</td></tr>
      </table>
    </div>
  );
};

export default GameRecord__Table;
