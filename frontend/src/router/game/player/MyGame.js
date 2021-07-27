import React, { useState } from 'react'
import './MyGame.css'
import NoGameList from 'components/game/player/NoGameList'
import GameList from 'components/game/player/GameList'

function MyGame () {
    const [gameList, setGameList] = useState([1])

    return (
        <div className="mygame">
            <h3>모든 게임 보기</h3>
            <h2>내 픽업 게임</h2>
            {!gameList.length ? <NoGameList /> : <GameList />}
        </div>
    )
}

export default MyGame