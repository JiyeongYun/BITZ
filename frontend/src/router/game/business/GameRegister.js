import GameApi from 'api/GameApi'
import GymApi from 'api/GymApi'
import React, {useContext, useEffect, useState} from 'react'
import { store } from 'store/store'
import './GameRegister.css'

const GameRegister = ({history}) => {
  const globalState = useContext(store);
  const { value } = globalState;
  // 오늘 날짜
  const today = new Date()

  // 경기 등록 시 필요 데이터
  const [gymName, setGymName] = useState(null)
  const [date, setDate] = useState(`${today.getFullYear()}-${today.getMonth()+1<10?"0" + String(today.getMonth()+1):today.getMonth()+1}-${today.getDate()<10?"0" + String(today.getDate()):today.getDate()}`)
  const [startHour, setStartHour] = useState(null)
  const [startMinute, setStartMinute] = useState(null)
  const [finishHour, setFinishHour] = useState(null)
  const [finishMinute, setFinishMinute] = useState(null)
  const [maxPeople, setMaxPeople] = useState(15)
  const [minPeople, setMinPeople] = useState(12)
  const [fee, setFee] = useState(null)

  // 체육관 목록
  const [gymList, setGymList] = useState([])


  // 로그인 한 비즈니스 유저의 체육관 표시
  useEffect(() => {
    const businessEmail = value.isLogin

    const data = {businessEmail}
    GymApi.myGymList(
      data,
      res => {
        const {data} = res
        setGymList(data)
        setGymName(data[0].name)
      },
      err => {
        console.log(err)
      }
    )
  }, [value.isLogin])

  // 입력 데이터 업데이트
  const onChange = (e) => {
    const {target:{value, id}} = e
    if (id === "gymName") {
      setGymName(value)
    } else if (id === "date") {
      setDate(value)
    } else if (id === "startTime") {
      setStartHour(value.slice(0,2))
      setStartMinute(value.slice(3,5))
    } else if (id === "finishTime") {
      setFinishHour(value.slice(0,2))
      setFinishMinute(value.slice(3,5))
    } else if (id === "fee") {
      setFee(value)
    } else if (id === "minPeople") {
      setMinPeople(value)
    } else if (id === "maxPeople") {
      setMaxPeople(value)
    }
    handleClass(value, id)
  }

  // value 값에 따른 done 클래스 추가 제거
  const handleClass = (value, id) => {
    const select = document.querySelector(`#${id}`)
    if (value) {
      select.classList.add('done')
    } else {
      select.classList.remove('done')
    }
  }

  // 픽업 게임 백엔드 등록
  const registerGame = () => {
    const startHour_ = String(startHour).length < 2 ? "0"+String(startHour) : String(startHour)
    const startMinute_ = String(startMinute).length < 2 ? "0"+String(startMinute) : String(startMinute)
    const finishHour_ = String(finishHour).length < 2 ? "0"+String(finishHour) : String(finishHour)
    const finishMinute_ = String(finishMinute).length < 2 ? "0"+String(finishMinute) : String(finishMinute)
    const data = {
      gymName,
      date,
      startTime: startHour_ + ":" + startMinute_ + ":00",
      endTime: finishHour_ + ":" + finishMinute_ + ":00",
      maxPeople,
      minPeople,
      participationFee: Number(fee),
    }
    console.log(data)
    GameApi.registerGame(
      data,
      res => {
        alert("날짜 : " + date + "\n" +
          "시간 : " + startHour_ + ":" + startMinute_ + " ~ " + finishHour_ + ":" + finishMinute_ + "\n" + 
          "픽업 게임이 생성되었습니다!"
        )
        history.push('/')
      },
      err => {
        console.log(err)
      }
    )
  }

  if (minPeople > maxPeople) {
    if (maxPeople < 12) {
      setMaxPeople(12)
    }
    setMinPeople(maxPeople)
  } else if (maxPeople > 18) {
    setMaxPeople(18)
  } else if (minPeople < 12) {
    setMinPeople(12)
  }


  return (
    <div className="game_register_container">
      <h1>픽업 게임 등록</h1>
      <div className="game__container">
        <div className="gym_select_box">
          <h4>체육관을 선택해주세요</h4>
          <select id="gymName" onChange={onChange}>
            {gymList.map(gym => {
              return (
                <option key={gym.id}>{gym.name}</option>
              )
            })}
          </select>
        </div>
        <div className="date_select_box">
          <h4>날짜를 입력해주세요</h4>
          <input type="date" id="date" className="done btn" onChange={onChange} value={date}/>
        </div>
        <div className="time_select_box">
          <h4>시작 시간과 종료 시간을 정해주세요</h4>
          <div className="time_container">
            <div className="start_time">
              <h5>시작 시간</h5>
              <input type="time" id="startTime" className="btn" onChange={onChange} />
            </div>
            <p>~</p>
            <div className="finish_time">
              <h5>종료 시간</h5>
              <input type="time" id="finishTime" className="btn" onChange={onChange} />
            </div>
          </div>
        </div>
        <div className="people_select_box">
          <h4>최소 인원을 정해주세요</h4>
          <div className="min_people">
            <input type="number" id="minPeople" className="done" onChange={onChange} value={minPeople}/>
            <span onClick={() => setMinPeople(Number(minPeople)-1)}>-</span>
            <span onClick={() => setMinPeople(Number(minPeople)+1)}>+</span>
          </div>
        </div>
        <div className="people_select_box">
          <h4>최대 인원을 정해주세요</h4>
          <div className="max_people">
            <input type="number" id="maxPeople" className="done" onChange={onChange} value={maxPeople} min={`${minPeople}`} max="18" />
            <span onClick={() => setMaxPeople(Number(maxPeople)-1)}>-</span>
            <span onClick={() => setMaxPeople(Number(maxPeople)+1)}>+</span>
          </div>
        </div>
        <div className="fee_select_box">
          <h4>인당 요금을 정해주세요 ( 단위: 원 )</h4>
          <input type="number" className="btn" id="fee" onChange={onChange} />
        </div>
        <button onClick={registerGame}>등록하기</button>
      </div>
    </div>
  )
}

export default GameRegister