import React from 'react';
import './GameRecord.css';
import GameRecord__Table from './GameRecord__Table';

const GameRecord = ({ gameData, setGameData }) => {
  const type = 3

  return (
    <div className="gameRecord">
      { type === gameData.gameType ? (
      <div className="gameRecord__2">
        <GameRecord__Table team1='A' team2='B' game='game1' gameData={gameData} setGameData={setGameData} />
      </div>
      ):(
      <div className="gameRecord__3">
        <GameRecord__Table team1='A' team2='B' game='game1' gameData={gameData} setGameData={setGameData} />
        <GameRecord__Table team1='B' team2='C' game='game2' gameData={gameData} setGameData={setGameData} />
        <GameRecord__Table team1='C' team2='A' game='game3' gameData={gameData} setGameData={setGameData} />
      </div>
      )}
    </div>
  );
};

export default GameRecord;
