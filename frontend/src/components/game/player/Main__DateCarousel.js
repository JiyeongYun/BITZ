import GameApi from "api/GameApi";
import React, { useEffect, useState } from "react";
import "./Main__DateCarousel.css"


export default function Main__DateCarousel() {
  // State
  // PJW - getDay()로 얻어지는 index별 요일과 색상 
  const day = [
    {name: "일", color: "red"},
    {name: "월", color: "black"},
    {name: "화", color: "black"},
    {name: "수", color: "black"},
    {name: "목", color: "black"},
    {name: "금", color: "black"},
    {name: "토", color: "blue"},
  ]
  // PJW - 오늘 날짜를 기준으로 14일 간의 날짜 정보 생성
  const dates = []
  for (let i=0;i<14;i++) {
    const now = new Date();
    const date = new Date(now.setDate(now.getDate()+i));
    if (!i) {
      dates.push({date: date.getDate()<10?"0"+String(date.getDate()):String(date.getDate()), day: day[date.getDay()].name, color: "today", year:date.getFullYear(), month:date.getMonth()+1<10?"0"+String(date.getMonth()+1):String(date.getMonth()+1)})
    } else {
      dates.push({date: date.getDate()<10?"0"+String(date.getDate()):String(date.getDate()), day: day[date.getDay()].name, color: day[date.getDay()].color, year:date.getFullYear(), month:date.getMonth()+1<10?"0"+String(date.getMonth()+1):String(date.getMonth()+1)})
    }
  }
  
  // 선택된 날짜에 대한 State(기본값: 오늘날짜)
  const [selectedDay, setSelectedDay] = useState(String(dates[0].year) + "-" + String(dates[0].month)  + "-" + String(dates[0].date))


  // PJW - Offset
  const [offset, setOffset] = useState(0)
  
  // Method
  // PJW - offset을 조정해서 Carousel Element 왼쪽 이동
  const moveLeft = () => {
    if (offset>-70) {
      setOffset(offset-10)
    }
  }
  // PJW - offset을 조정해서 Carousel Element 오른쪽 이동
  const moveRight = () => {
    if (offset<0) {
      setOffset(offset+10)
    }
  }
  
  // Effect
  // PJW - offset 조정 시 실제로 이동
  // PJW - offset 에 따라 이동 버튼 활성화
  useEffect(()=>{
    const carousel = document.querySelectorAll('.main__dateCarousel__element')
    carousel.forEach((element)=>{
      element.style.left = `${offset}vw`
    })
    
    const leftArrow = document.querySelector('.carouselArrow__right')
    const rightArrow = document.querySelector('.carouselArrow__left')
    if (offset<=-70) {
      leftArrow.style.display = 'none'
    } else if (offset>=0) {
      rightArrow.style.display = 'none'
    } else {
      leftArrow.style.display = 'inline'
      rightArrow.style.display = 'inline'
    }
  }, [offset])

  // 날짜를 선택하면 해당 날짜의 게임 리스트를 요청하고 day_today 클래스를 추가
  const selectDay = (e) => {
    const {target: {id}} = e
    document.querySelector('#t' + selectedDay).classList.remove("day_select")
    setSelectedDay(id.slice(1))
    document.querySelector('#' + id).classList.add("day_select")
  }

  
  // 게임 데이터 받아오기
  const data = {
    date: Date.parse(selectedDay),
    sido: '서울'
  }
  console.log(data)
  GameApi.requsetGameList(
    data,
    res => console.log(res),
    err => console.log(err)
  )
  
  
  // PJW - Rendering
  return(
    <div className="main__dateCarousel">
      <div className="main__dateCarousel__Carousel">
        { dates.map(date => (
        <div
          onClick={selectDay}
          className={"main__dateCarousel__element" + (date.color === "red" ? " day_red":"") + (date.color === "blue" ? " day_blue":"") + (date.color === "today" ? " day_select":"")} 
          key={date.date}
          id={"t" + String(date.year)  + "-" + String(date.month) + "-" + String(date.date)}
        >
          <div className="main__dateCarousel__date">
            <div id={"t" + String(date.year) + "-" + String(date.month) + "-" + String(date.date)}>
              {date.date}
            </div>
            <div id={"t" + String(date.year) + "-" + String(date.month) + "-" + String(date.date)}>
              {date.day}
            </div>
          </div>
        </div>
        ))}
      <img className="carouselArrow carouselArrow__left" src="/images/left-arrow.png" alt="logo" onClick={moveRight} />
      <img className="carouselArrow carouselArrow__right" src="/images/right-arrow.png" alt="logo" onClick={moveLeft} />
      </div>
    </div>
  )
}