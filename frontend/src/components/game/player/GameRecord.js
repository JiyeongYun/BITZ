import React, { useContext } from 'react';
import './GameRecord.css';
import GameRecordTable from './GameRecord__Table';
import { gameStore } from 'store/gameStore';

const GameRecord = () => {
  const gameStoreData = useContext(gameStore);
  const { aboutGame } = gameStoreData;
  return (
    <div className="gameRecord">
      <div>
        경기 기록
      </div>
      { aboutGame.gameData.gameType === 2 ? ( // 2팀 경기
      <div className="gameRecord__2">
        <GameRecordTable team1='A' team2='B' game='game1' />
        <GameRecordTable team1='A' team2='B' game='game2' />
      </div>
      ):( // 3팀 경기
      <div className="gameRecord__3">
        <GameRecordTable team1='A' team2='B' game='game1' />
        <GameRecordTable team1='B' team2='C' game='game2' />
        <GameRecordTable team1='C' team2='A' game='game3' />
      </div>
      )}
    </div>
  );
};

export default GameRecord;
