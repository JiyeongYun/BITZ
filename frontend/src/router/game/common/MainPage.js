import React from "react";
import "./MainPage.css";
import DateCarousel from "components/game/player/Main__DateCarousel.js";
import PreferredArea from "components/game/player/Main__PreferredArea.js";
import GameList from "components/game/player/Main__GameList.js";
import gameContext from "store/gameContext.js"

function MainPage() {
  return(
    <div className="main">
      <div className="main__dates"><DateCarousel /></div>
      <div className="main__areas"><PreferredArea /></div>
      <div className="main__games"><GameList /></div>
    </div>
  )
}

export default MainPage