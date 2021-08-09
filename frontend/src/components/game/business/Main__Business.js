import React, { useContext, useEffect, useState } from "react"
import "./Main__Business.css"
import { store } from 'store/store.js'
import gameManageListDummy from "store/gameManageListDummy";
import {Link} from 'react-router-dom'
import UserApi from "api/UserApi";

function Main__Business ({history}) {
  // Global State Managemnet
  const globalState = useContext(store);
  const { value, dispatch } = globalState;
  const { gameManagementList } = value.businessData
  // 요일 index => 요일
  const Day_index2name = ["일", "월", "화", "수", "목", "금", "토"]
  // API를 통해 비즈니스 계정용 관리 데이터 가져오기 (현재는 Dummydata 사용)
  useEffect(()=>{
    dispatch({ type: 'FETCH_GAME_MANAGEMENT_LIST', value: gameManageListDummy })
  },[dispatch])
  // 날짜별로 데이터를 관리하기 위해 데이터 가공
  const [processedData, setProcessedData] = useState([])
  useEffect(()=>{
    // setState를 쓰지 않기 위해 지역 변수 선언
    // 중간 중간 setState를 쓰면 setState가 비동기 방식이기 때문에 중간 저장 X, forEach문의 마지막 회차 값만 저장된다
    // async await이나 promise처럼 강제로 동기로 만드는 것은 좋지 않은 방식
    let dataBox = []
    // Store에 있는 값을 하나씩 확인하면서 dataBox에 추가
    gameManagementList.forEach(game=>{
      const time = {year:game.date.getFullYear(),month:game.date.getMonth(),date:game.date.getDate(),day:game.date.getDay()}
      const date_of_this_game_in_list = dataBox.find(element=>{return JSON.stringify(element.time)===JSON.stringify(time)}) // 해당 날짜의 게임
      const new_processedData = dataBox.filter(element=>JSON.stringify(element.time)!==JSON.stringify(time)) // 해당 날짜를 뺀 게임
      if (!dataBox.length || !date_of_this_game_in_list) {
        new_processedData.push({time:time, games:[game]})
      } else {
        date_of_this_game_in_list.games.push(game)
        new_processedData.push(date_of_this_game_in_list)
      }
      dataBox = new_processedData
    })
    setProcessedData(dataBox)
  },[gameManagementList])

  // 체육관 등록이 안되어 있으면 체육관 등록 페이지 이동
  useEffect(() => {
    const data = {
      email: value.isLogin,
      password: null,
    }

    UserApi.busFirstLogin(
      data,
      res => {
        if(res.status === 200) {
          history.push('/registergym')
        }
      },
      err => console.log(err)
    )
  }, [value.isLogin, history])

  return (
    <div className="MainBusiness">
      <div>
        <div className="MainBusiness__top">
          <div>게임 관리하기</div>
          <div className="MainBusiness__top_links">
            <div>
              모든 게임 보기
            </div>
            <div>
              |
            </div>
            <div>
              <Link to="/match/register">픽업 게임 등록하기</Link>
            </div>
          </div>
        </div>
        <div className="MainBusiness__allGameList">
          {
            processedData.length ? (
              processedData.map((game,idx)=>(
                <div className="MainBusiness__EachDate" key={idx}>
                  <div className={idx? "MainBusiness__DateName" : "MainBusiness__DateName MainBusiness__DateName_Today"}>
                    {!idx? (<div className="MainBusiness__Today">오늘</div>) : ""}
                    {`${game.time.month+1}월 ${game.time.date}일 (${Day_index2name[game.time.day]})`}
                  </div>
                  <div className="MainBusiness__DailyGames">
                    {game.games.map((game,idx)=>(
                      <div key={idx} className="MainBusiness__DailyGame">
                        {idx? <hr /> : ""}
                        {/* 게임 내용 시작 */}
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
                              {game.City + " " + game.Area}
                            </div>
                            <div className="gameList__game__location">
                              {"코트 규격: " + game.court_length + "m * " + game.court_width + "m"}
                            </div>
                          </div>
                          <div className="MainBusiness__game__personnel">
                            <div>
                              {`최대 ${game.max_people}`}
                            </div>
                            <div>
                              {`최소 ${game.min_people}`}
                            </div>
                          </div>

                          <div className="MainBusiness__game__participants">
                            <span>{"모집인원 | "}</span>
                            <span>
                              {`${game.gameparticipant.filter(element=>element.state===2).length} 명`}
                            </span>
                            <span>{" / "}</span>
                            <span>
                              {`${game.max_people} 명 `}
                            </span>
                            <span>
                              {" 입금 확인 요청 | "}
                            </span>
                            <span>
                              {game.gameparticipant.filter(element=>element.state===1).length}명
                            </span>
                          </div>

                          <div className="gameList__game__state">
                            { function(){if (game.gameparticipant.filter(element=>element.state===2).length===game.max_people) {
                              return (
                                <button className="gameList__state__button gameList__state__button_Complete">모집 완료</button>
                              )
                            } else if (game.gameparticipant.filter(element=>element.state===2).length>=game.min_people) {
                              return (
                                <button className="gameList__state__button gameList__state__button_Confirm">게임 확정</button>
                              )
                            } else {
                              return (
                                <button className="gameList__state__button gameList__state__button_Wait">모집 중</button>
                              )
                            }}() }
                          </div>
                        </div>
                        {/* 게임 내용 끝 */}
                      </div>
                    ))}
                  </div>
              </div>
            ))
            ):(<div>등록된 게임이 없습니다.</div>)
          }
        </div>
      </div>
    </div>
  )
}

export default Main__Business