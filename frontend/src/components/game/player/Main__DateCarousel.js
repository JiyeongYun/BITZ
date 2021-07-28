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
      dates.push({date: date.getDate(), day: day[date.getDay()].name, color: "today"})
    } else {
      dates.push({date: date.getDate(), day: day[date.getDay()].name, color: day[date.getDay()].color})
    }
  }
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

  
  // PJW - Rendering
  return(
    <div className="main__dateCarousel">
      <div className="main__dateCarousel__Carousel">
        { dates.map(date => (
        <div 
          className={"main__dateCarousel__element" + (date.color === "red" ? " day_red":"") + (date.color === "blue" ? " day_blue":"") + (date.color === "today" ? " day_today":"")} 
          key={date.date}>
          <div className="main__dateCarousel__date">
            <div>
              {date.date}
            </div>
            <div>
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