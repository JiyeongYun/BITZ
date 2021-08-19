import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './MyGame.css';
import NoGameList from 'components/game/player/NoGameList';
import GameList from 'components/game/player/GameList';
import { store } from 'store/store.js';
import GameApi from 'api/GameApi';

function MyGame() {
  const [gameList, setGameList] = useState([]);

  const globalState = useContext(store);
  const { dispatch, value } = globalState;

  useEffect(() => {
    const params = {
      email: value.isLogin,
    };
    GameApi.requestMyGame(
      params,
      (res) => {
        setGameList(res.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <div className={!gameList.length ? "mygame mar_100" : "mygame"}>
      <div>
        <h2>내 픽업 게임</h2>
        {!gameList.length ? <NoGameList /> : <GameList gameList={gameList} />}
      </div>
    </div>
  );
}

export default MyGame;
