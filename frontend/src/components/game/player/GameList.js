import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './GameList.css';

function GameList({ gameList }) {
  const [list, setList] = useState([]);

  // 오늘 날짜 가져오기
  const date = new Date();
  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

  useEffect(() => {
    const keys = Object.keys(gameList);
    let tmpList = [];
    keys.map((element) => {
      let gameObj = gameList[element];
      gameObj.date = new Date(gameList[element].date);
      tmpList.push(gameObj);
      return null
    });
    setList(tmpList);
  }, [gameList]);
  console.log(gameList)
  return (
    <div className="MyGameList">
      {
        <section className="game_container">
          <article className="gamelist">
            <div className="date today">
              {month}월 {day}일
            </div>
            {list.map((game) => {
              const gamedate = new Date(game.gameInfo.date);
              if (gamedate.getDate() === day) {
                return (
                  <div key={game.gameInfo.id} className="game_container">
                    <div className="game__time">
                      {String(game.gameInfo.startTime).slice(0, 5)} ~{' '}
                      {String(game.gameInfo.endTime).slice(0, 5)}
                    </div>
                    <div className="gym__info">
                      <h5>{game.gameInfo.gym.name}</h5>
                      <p>
                        {game.gameInfo.gym.sido} {game.gameInfo.gym.gugun}
                      </p>
                      <p>
                        {game.gameInfo.gym.courtLength}m X {game.gameInfo.gym.courtWidth}m
                      </p>
                    </div>
                    <div className="people__info">
                      <p className="min_people">최소 {game.gameInfo.minPeople}</p>
                      <p className="max_people">최대 {game.gameInfo.maxPeople}</p>
                    </div>
                    <Link to={`/detail/${game.gameInfo.id}`} className="situation">{game.gameParticipant.state === 'COMPLETE' ? '확정' : '대기중'}</Link>
                  </div>
                );
              } else return null
            })}
          </article>
          <article className="gamelist">
            <div className="date">
              {month}월 {day + 1}일
            </div>
            {list.map((game) => {
              const gamedate = new Date(game.gameInfo.date);
              if (gamedate.getDate() === day + 1) {
                return (
                  <div key={game.gameInfo.id} className="game_container">
                    <div className="game__time">
                      {String(game.gameInfo.startTime).slice(0, 5)} ~{' '}
                      {String(game.gameInfo.endTime).slice(0, 5)}
                    </div>
                    <div className="gym__info">
                      <h5>{game.gameInfo.gym.name}</h5>
                      <p>
                        {game.gameInfo.gym.sido} {game.gameInfo.gym.gugun}
                      </p>
                      <p>
                        {game.gameInfo.gym.courtLength}m X {game.gameInfo.gym.courtWidth}m
                      </p>
                    </div>
                    <div className="people__info">
                      <p className="max_people">최대 {game.gameInfo.maxPeople}</p>
                      <p className="min_people">최소 {game.gameInfo.minPeople}</p>
                    </div>
                    <Link to={`/detail/${game.gameInfo.id}`} className="situation">{game.gameParticipant.state === 'COMPLETE' ? '확정' : '대기중'}</Link>
                  </div>
                );
              } else return null
            })}
          </article>
          <article className="gamelist">
            <div className="date">
              {month}월 {day + 2}일
            </div>
            {list.map((game) => {
              const gamedate = new Date(game.gameInfo.date);
              if (gamedate.getDate() === day + 2) {
                return (
                  <div key={game.gameInfo.id} className="game_container">
                    <div className="game__time">
                      {String(game.gameInfo.startTime).slice(0, 5)} ~{' '}
                      {String(game.gameInfo.endTime).slice(0, 5)}
                    </div>
                    <div className="gym__info">
                      <h5>{game.gameInfo.gym.name}</h5>
                      <p>
                        {game.gameInfo.gym.sido} {game.gameInfo.gym.gugun}
                      </p>
                      <p>
                        {game.gameInfo.gym.courtLength}m X {game.gameInfo.gym.courtWidth}m
                      </p>
                      <p>최소 :{game.gameInfo.minPeople} | 최대 : {game.gameInfo.maxPeople}</p>
                    </div>
                    <div className="people__info">
                      <p className="min_people">최소 {game.gameInfo.minPeople}</p>
                      <p className="max_people">최대 {game.gameInfo.maxPeople}</p>
                    </div>
                    <Link to={`/detail/${game.gameInfo.id}`} className="situation">{game.gameParticipant.state === 'COMPLETE' ? '확정' : '대기중'}</Link>
                  </div>
                );
              } return null
            })}
          </article>
        </section>
      }
    </div>
  );
}

export default GameList;
