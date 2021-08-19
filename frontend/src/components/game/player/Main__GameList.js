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
  const participateGame = (event) => {
    history.push(`/detail/${event.target.value}`)
  }

  gameData.sort((a, b) => {
    const result = Number(String(a.gameInfo.startTime).slice(0, 2)) - Number(String(b.gameInfo.startTime).slice(0, 2))
    if (result < 0) {
      return -1
    } else {
      return 1
    }
  })

  return(
    <div className="main__gameList">
      <hr></hr>
      <div className="gameList__List">
        { gameData.map((game, idx)=>(
          <div className="gameList__game" key={idx}>
            <div className="gameList__content">

              <div className="gameList__game__Time">
                <div className="gameList__start">
                  {game.gameInfo.startTime.substr(0,2)+" : "+game.gameInfo.startTime.substr(3,2)+" ~"}
                </div>
                <div className="gameList__end">
                  {game.gameInfo.endTime.substr(0,2)+" : "+game.gameInfo.endTime.substr(3,2)}
                </div>
              </div>

              <div className="gameList__game__info">
                <div className="gameList__game__name">
                  {game.gameInfo.gym.name}
                </div>
                <div className="gameList__game__location">
                  {game.gameInfo.gym.sido + " " + game.gameInfo.gym.gugun} <span>| 코트 규격: {game.gameInfo.gym.courtLength + "m * " + game.gameInfo.gym.courtWidth +"m"}</span>
                </div>
                <div className="gameList__game__personnel">
                  {"최소인원 : " + game.gameInfo.minPeople + " | 최대인원 : " + game.gameInfo.maxPeople}
                </div>
              </div>

              <div className="gameList__game__facilities">
                {/* {game.gymInfo.parking ? <div className="gameList__game__facility">주차장</div>:""}
                {game.gymInfo.shower ? <div className="gameList__game__facility">샤워시설</div>:""}
                {game.gymInfo.airconditional ? <div className="gameList__game__facility">에어컨</div>:""}
                {game.gymInfo.basketball ? <div className="gameList__game__facility">농구공 대여</div>:""}
                {game.gymInfo.scoreboard ? <div className="gameList__game__facility">점수판&호루라기</div>:""}
                {game.gymInfo.water ? <div className="gameList__game__facility">정수기</div>:""} */}
                <div><img src="/images/scoreboard.png" alt="scoreboard" className="facility_img" /><span className={game.gymInfo.scoreboard?"img_on":"img_off"}></span></div>
                <div><img src="/images/airconditioner.png" alt="airconditional" className="facility_img" /><span className={game.gymInfo.airconditional?"img_on":"img_off"}></span></div>
                <div><img src="/images/basketball.png" alt="basketball" className="facility_img" /><span className={game.gymInfo.basketball?"img_on":"img_off"}></span></div>
                <div><img src="/images/water.png" alt="water" className="facility_img" /><span className={game.gymInfo.water?"img_on":"img_off"}></span></div>
                <div><img src="/images/shower.png" alt="shower" className="facility_img" /><span className={game.gymInfo.shower?"img_on":"img_off"}></span></div>
                <div><img src="/images/parking.png" alt="parking" className="facility_img" /><span className={game.gymInfo.parking?"img_on":"img_off"}></span></div>
              </div>

              <div className="gameList__game__state">
                <button className="gameList__state__button" onClick={participateGame} value={game.gameInfo.id}>참여하기</button>
              </div>
            </div>
            <hr/>
          </div>
        ))}
      </div>
    </div>
  )
}