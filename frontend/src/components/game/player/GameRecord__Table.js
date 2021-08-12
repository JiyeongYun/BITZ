import React, { useContext, useState } from 'react';
import GameRecordInput from './GameRecord__Input.js';
import './GameRecord__Table.css';
import { gameStore } from 'store/gameStore';

const GameRecord__Table = ({ team1, team2, game }) => {
  const gameStoreData = useContext(gameStore);
  const { aboutGame } = gameStoreData;
  // 모달 창 display 여부
  const [showInput, setShowInput] = useState(false)
  // indexing을 위한 naming
  const team1_score = game+'_team1_score'
  const team2_score = game+'_team2_score'
  const recorder = game+'_recorder'
  // 쿼터 데이터
  const quarters = []
  for (let i=0;i<aboutGame.gameData[recorder].length;i++){
    quarters.push(i)
  }
  // 입력 버튼 클릭
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
          <td>{aboutGame.gameData[team1_score][quarter]}</td>
          <td>{aboutGame.gameData[team2_score][quarter]}</td>
          <td>{aboutGame.gameData[recorder][quarter]}</td>
          </tr>))}
        { showInput ? <GameRecordInput game={game} setShowInput={setShowInput} team1={team1} team2={team2} /> : "" }
        { aboutGame.gameState !== 4 ?
        <tr onClick={addRecord} className="gameRecord__button"><td colSpan="4">{ !showInput ? '추가' : '기록 중' }</td></tr>
        : ""
        }
      </table>
    </div>
  );
};

export default GameRecord__Table;
