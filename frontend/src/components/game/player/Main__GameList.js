import React, { useContext } from "react";
import "./Main__GameList.css"
import { store } from 'store/store.js';
import { useHistory  } from 'react-router-dom';

export default function Main__GameList() {
  const globalState = useContext(store);
  const gameData = globalState.value.gameList

  // PJW - 참여하기 버튼 클릭 시 게임 상세 페이지로 이동
  // history가 실행 X??
  const history = useHistory();
  const participateGame = () => {
    history.push('/detail', {})
  }

  return(
    <div className="main__gameList">
      <hr></hr>
      <div className="gameList__List">
        { gameData.map((game)=>(
          <div className="gameList__game" key={game.id}>
            <div className="gameList__content">

              <div className="gameList__game__Time">
                <div className="gameList__start">
                  {game.start_time.substr(0,2)+" : "+game.start_time.substr(2,4)+" ~"}
                </div>
                <div className="gameList__end">
                  {game.end_time.substr(0,2)+" : "+game.end_time.substr(2,4)}
                </div>
              </div>

              <div className="gameList__game__info">
                <div className="gameList__game__name">
                  {game.name}
                </div>
                <div className="gameList__game__location">
                  {game.City + " " + game.Area + " | 코트 규격: " + game.court_length + " * " + game.court_width}
                </div>
                <div className="gameList__game__personnel">
                  {"인원모집: " + game.min_people + " ~ " + game.max_people + " 명"}
                </div>
              </div>

              <div className="gameList__game__facilities">
                {game.is_parking ? <div className="gameList__game__facility">주차장</div>:""}
                {game.is_shower ? <div className="gameList__game__facility">샤워시설</div>:""}
                {game.is_airconditional ? <div className="gameList__game__facility">에어컨</div>:""}
                {game.is_basketball ? <div className="gameList__game__facility">농구공 대여</div>:""}
                {game.is_scoreboard ? <div className="gameList__game__facility">점수판&호루라기</div>:""}
                {game.is_water ? <div className="gameList__game__facility">정수기</div>:""}
              </div>

              <div className="gameList__game__state">
                <button className="gameList__state__button" onClick={participateGame}>참여하기</button>
              </div>
            </div>
            <hr/>
          </div>
        ))}
      </div>
    </div>
  )
}