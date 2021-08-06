import React, {useState} from 'react'
import './GameRegister.css'

const GameRegister = () => {
  // const [gymName, setGymName] = useState(null)
  // const [year, setYear] = useState(null)
  // const [month, setMonth] = useState(null)
  // const [date, setDate] = useState(null)


  return (
    <div className="game_register_container">
      <h1>픽업 게임 등록</h1>
      <div className="game__container">
        <div className="gym_select_box">
          <h4>체육관을 선택해주세요</h4>
          <select>
            <option>오마이걸 체육관</option>
            <option>싸피 체육관</option>
          </select>
        </div>
        <div className="date_select_box">
          <h4>날짜를 입력해주세요</h4>
          <input type="text" id="year" />
          <span>년</span>
          <input type="text" id="month" />
          <span>월</span>
          <input type="text" id="date" />
          <span>일</span>
        </div>
        <div className="time_select_box">
          <h4>시작 시간과 종료 시간을 정해주세요</h4>
          <div className="time_container">
            <div className="start_time">
              <h5>시작 시간</h5>
              <input type="text" id="start_hour" />
              <span>:</span>
              <input type="text" id="start_minute" />
            </div>
            <p>~</p>
            <div className="finish_time">
              <h5>종료 시간</h5>
              <input type="text" id="finish_hour" />
              <span>:</span>
              <input type="text" id="finish_minute" />
            </div>
          </div>
        </div>
        <div className="people_select_box">
          <h4>최소 인원과 최대 인원을 정해주세요</h4>
          <div className="people_container">
            <div className="min_people">
              <h5>최소 인원</h5>
              <input type="number" id="min_people" /><span>명</span>
            </div>
            <p>~</p>
            <div className="max_people">
              <h5>최대 인원</h5>
              <input type="number" id="min_people" /><span>명</span>
            </div>
          </div>
        </div>
        <div className="fee_select_box">
          <h4>인당 요금을 정해주세요</h4>
          <input type="number" id="fee" />
          <span> 원</span>
        </div>
        <button>등록하기</button>
      </div>
    </div>
  )
}

export default GameRegister