import React, { useEffect, useContext, useState } from 'react'
import './Location.css'
import { locations } from 'store/location.js'

const Location = (props) => {    
    
  // 위치 정보
  const location = useContext(locations)

  // State 값
  const [sido, setSido] = useState(null)

  // sido 변경 시 실행 함수
  const onChangeSido = (e) => {
    const {target: {value}} = e
    setSido(value)
    props.setSido(value)
  }

  const onChangeGugun = (e) => {
    const {target: {value}} = e
    props.setGugun(value)
  }

  useEffect(() => {
    if (props.locationUpdate) {
      const selects = document.querySelectorAll("select")
      selects.forEach(select => select.disabled = true)
    } else {
      const selects = document.querySelectorAll("select")
      selects.forEach(select => select.disabled = false)
    }
  })

  return (
    <div>
      <select className="sido_select" onChange={onChangeSido}>
        <option>선호 지역</option>
          {location.sido.map((t,idx) => {
            return (
              <option key={idx}>{t}</option>
          )
        })}
      </select>
      <select onChange={onChangeGugun}>
        <option>세부 지역</option>
        {location.gugun.[sido] ? location.gugun[sido].map((t,idx) => {
          return (
            <option key={idx+100}>{t}</option>
          )
        })
        : null
        }
      </select>
    </div>
  )
}

export default Location