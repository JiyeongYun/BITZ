import React from "react";
import "./Main__PreferredArea.css"

export default function Main__PreferredArea() {
  // State
  // PJW - getDay()로 얻어지는 index별 요일과 색상 
  const areas = ["서울","경기","인천","대전","충북","충남","대구","부산","울산","경북",]
  return(
    <div className="main__preferredArea">
      { areas.map((area)=>(
        <div className="preferredArea__area" key={area}>
          {area}
        </div>
      )) }
    </div>
  )
}