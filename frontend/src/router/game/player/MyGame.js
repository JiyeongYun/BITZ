import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './MyGame.css'
import NoGameList from 'components/game/player/NoGameList'
import GameList from 'components/game/player/GameList'

function MyGame () {
    const [gameList, setGameList] = useState([])

    return (
        <div className="mygame">
            <h3><Link to="/">모든 게임 보기</Link></h3>
            <h2>내 픽업 게임</h2>
            {!gameList.length ? <NoGameList /> : <GameList />}
        </div>
    )
}

export default MyGame