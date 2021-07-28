import React, { useContext } from "react";
import "./Main__GameList.css"
import { store } from 'store/store.js';

export default function Main__GameList() {
  const globalState = useContext(store);
  console.log('4', globalState.value, '(자식)')
  const gameData = globalState.value.gameList
  console.log(gameData)

  return(
    <div className="main__gameList">
      <hr></hr>
      <div className="gameList__List">
        { gameData.map((game)=>(
          <div className="gameList__game" key={game.id}>
            <div className="gameList__content">

              <div className="gameList__game__Time">
                {game.start_time.substr(0,2)+" : "+game.start_time.substr(2,4)}<br />~ {game.end_time.substr(0,2)+" : "+game.end_time.substr(2,4)}
              </div>

              <div className="gameList__game__info">
                <div className="gameList__game__name">
                  {game.name}
                </div>
                <div className="gameList__game__location">
                  {game.City + " " + game.Area + " | 코트 규격: " + game.court_length + " * " + game.court_width}
                </div>
                <div className="gameList__game__personnel">
                  {"최소인원: " + game.min_people + " | 최대인원: " + game.max_people}
                </div>
              </div>

              <div className="gameList__game__facility">
                {game.is_parking ? <div>주차장</div>:""}
                {game.is_shower ? <div>샤워시설</div>:""}
                {game.is_airconditional ? <div>에어컨</div>:""}
                {game.is_basketball ? <div>농구공 대여</div>:""}
                {game.is_scoreboard ? <div>점수판&호루라기</div>:""}
                {game.is_water ? <div>정수기</div>:""}
              </div>

              <div className="gameList__game__state">
                <button>참여하기</button>
              </div>
            </div>
            <hr></hr>
          </div>
        ))}
      </div>
    </div>
  )
}