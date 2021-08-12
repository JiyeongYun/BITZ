import React, { useContext, useEffect, useState } from "react"
import "./Main__Business.css"
import { store } from 'store/store.js'
import {Link} from 'react-router-dom'
import UserApi from "api/UserApi";
import GameApi from "api/GameApi";
import Main__Player_Common from "../player/Main__Player_Common";

function Main__Business ({history}) {
  // Global State Managemnet
  const globalState = useContext(store);
  const { value : {isLogin} } = globalState;

  // 오늘 날짜 가져오기
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth()+1<10?"0"+(date.getMonth()+1):date.getMonth()+1
  const day = date.getDate()<10?"0"+date.getDate():date.getDate()
  const today = `${year}-${month}-${day}`

  // 픽업 게임 리스트
  const [gameLists, setGameLists] = useState([])

  // 체육관 등록이 안되어 있으면 체육관 등록 페이지 이동
  useEffect(() => {
    const data = {
      email: isLogin,
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
  }, [isLogin, history])
  
  useEffect(()=>{
    const data = {
      email : isLogin,
      date : today,
    }

    GameApi.myGameList(data,
      res => {
        setGameLists(res.data)
      },
        err => {
        console.log(err)
      }
    )
  }, [])

  // 모든 게임 보기 버튼 활성화
  const [toggleGameList, setToggleGameList] = useState(true)
  const onToggle = () => {
    setToggleGameList(!toggleGameList)
  }

  // 게임 관리 상세 페이지
  const manageGame = () => {
    history.push({
      pathname: '/detail/1',
      state: {isBusiness: true}
    })
  }

  gameLists.sort((a,b) => {
    const result = Number(String(a.startTime).slice(0, 2)) - Number(String(b.startTime).slice(0, 2))
    if (result < 0) {
      return -1
    } else {
      return 1
    }
  })
  
  return (
  <div>
    <div className="MainBusiness">
      <div>
        <div className="MainBusiness__top">
          <div className="MainBusiness__top_links">
            <div onClick={onToggle} className="MainBusiness__toggle_game_list">
              { toggleGameList ? <span>모든 게임 보기</span> : <span>나의 게임 보기</span> }
            </div>
            <div>
              |
            </div>
            <div>
              <Link to="/match/register">픽업 게임 등록하기</Link>
            </div>
          </div>
        </div>
        {toggleGameList ?
          <section className="game_container">
            <article className="gamelist">
              <div className="date today">{month}월 {day}일</div>
              {gameLists.map(game => {
                const gamedate = new Date(game.date)
                if (gamedate.getDate() === day) {
                  return (
                    <div key={game.id} className="game_container">
                      <div className="game__time">{String(game.startTime).slice(0, 5)} ~ {String(game.endTime).slice(0, 5)}</div>
                      <div className="gym__info">
                        <h5>{game.gym.name}</h5>
                        <p>{game.gym.sido} {game.gym.gugun}</p>
                        <p>{game.gym.courtLength}m X {game.gym.courtWidth}m</p>
                      </div>
                      <div className="people__info">
                        <p className="max_people">최대 {game.maxPeople}</p>
                        <p className="min_people">최소 {game.minPeople}</p>
                      </div>
                      <div className="participant">
                        <p>모집 인원 : <span>{game.participant}</span>/{game.maxPeople}</p>
                        <p>입금 확인 요청 : <span>{game.participant}</span>명</p>
                      </div>
                      <button className="game__btn">모집 중</button>
                    </div>
                  )
                }
              })}
            </article>
            <article className="gamelist">
              <div className="date">{month}월 {day+1}일</div>
              {gameLists.map(game => {
                const gamedate = new Date(game.date)
                if (gamedate.getDate() === day+1) {
                  return (
                    <div key={game.id} className="game_container">
                      <div className="game__time">{String(game.startTime).slice(0, 5)} ~ {String(game.endTime).slice(0, 5)}</div>
                      <div className="gym__info">
                        <h5>{game.gym.name}</h5>
                        <p>{game.gym.sido} {game.gym.gugun}</p>
                        <p>{game.gym.courtLength}m X {game.gym.courtWidth}m</p>
                      </div>
                      <div className="people__info">
                        <p className="max_people">최대 {game.maxPeople}</p>
                        <p className="min_people">최소 {game.minPeople}</p>
                      </div>
                      <div className="participant">
                        <p>모집 인원 : <span>{game.participant}</span>/{game.maxPeople}</p>
                        <p>입금 확인 요청 : <span>{game.participant}</span>명</p>
                      </div>
                      <button className="game__btn">모집 중</button>
                    </div>
                  )
                }
              })}
            </article>
            <article className="gamelist">
              <div className="date">{month}월 {day+2}일</div>
              {gameLists.map(game => {
                const gamedate = new Date(game.date)
                if (gamedate.getDate() === day+2) {
                  return (
                    <div key={game.id} className="game_container">
                      <div className="game__time">{String(game.startTime).slice(0, 5)} ~ {String(game.endTime).slice(0, 5)}</div>
                      <div className="gym__info">
                        <h5>{game.gym.name}</h5>
                        <p>{game.gym.sido} {game.gym.gugun}</p>
                        <p>{game.gym.courtLength}m X {game.gym.courtWidth}m</p>
                      </div>
                      <div className="people__info">
                        <p className="max_people">최대 {game.maxPeople}</p>
                        <p className="min_people">최소 {game.minPeople}</p>
                      </div>
                      <div className="participant">
                        <p>모집 인원 : <span>{game.participant}</span>/{game.maxPeople}</p>
                        <p>입금 확인 요청 : <span>{game.participant}</span>명</p>
                      </div>
                      <button className="game__btn">모집 중</button>
                    </div>
                  )
                }
              })}
            </article>
          </section>
          :<Main__Player_Common isBusiness={true} />
        }
      </div>
    </div>
  </div>
  )
}
     
export default Main__Business