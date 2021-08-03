import React from 'react';
import './GameRecord.css';
import GameRecordTable from './GameRecord__Table';

const GameRecord = ({ gameData, setGameData, gameState }) => {
  return (
    <div className="gameRecord">
      <div>
        경기 기록
      </div>
      { gameData.gameType === 2 ? (
      <div className="gameRecord__2">
        <GameRecordTable team1='A' team2='B' game='game1' gameData={gameData} setGameData={setGameData} gameState={gameState} />
      </div>
      ):(
      <div className="gameRecord__3">
        <GameRecordTable team1='A' team2='B' game='game1' gameData={gameData} setGameData={setGameData} gameState={gameState} />
        <GameRecordTable team1='B' team2='C' game='game2' gameData={gameData} setGameData={setGameData} gameState={gameState} />
        <GameRecordTable team1='C' team2='A' game='game3' gameData={gameData} setGameData={setGameData} gameState={gameState} />
      </div>
      )}
    </div>
  );
};

export default GameRecord;
