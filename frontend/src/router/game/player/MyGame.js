import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './MyGame.css'
import NoGameList from 'components/game/player/NoGameList'
import GameList from 'components/game/player/GameList'
import { store } from 'store/store.js';

function MyGame () {
    const globalState = useContext(store);
    const { value } = globalState;
    const gameList = value.myGameList

    return (
        <div className="mygame">
            <h2>내 픽업 게임</h2>
            {!gameList.length ? <NoGameList /> : <GameList />}
        </div>
    )
}

export default MyGame