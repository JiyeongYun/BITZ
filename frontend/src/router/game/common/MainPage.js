import React, { createContext, useEffect, useState } from "react";
import "./MainPage.css";
import DateCarousel from "components/game/player/Main__DateCarousel.js";
import PreferredArea from "components/game/player/Main__PreferredArea.js";
import GameList from "components/game/player/Main__GameList.js";

import GameApi from "api/GameApi";
import gameListDummy from "store/gameListDummy"

// 전역 변수 설정 전 임시 더미 데이터
export const stateGameContext = createContext()

function MainPage() {
  const [gameData, setGameData] = useState([])

  // useEffect
  // useAPI를 이용해 axios 요청으로 게임 데이터 받아오기
  useEffect(()=>{
    // 임시로 gameListDummy Data를 가져와서 사용
    GameApi.requsetGameList(null, ()=>{
      setGameData(gameListDummy)
    },()=>null)
  })

  return(
    <div className="main">
      <stateGameContext.Provider value={gameData}>
        <div className="main__dates"><DateCarousel /></div>
        <div className="main__areas"><PreferredArea /></div>
        <div className="main__games"><GameList /></div>
      </stateGameContext.Provider>
    </div>
  )
}

export default MainPage