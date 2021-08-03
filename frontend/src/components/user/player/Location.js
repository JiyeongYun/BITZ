import React, { useEffect } from 'react'
import './Location.css'

const Location = (props) => {    
    const seoul = [
        {id:1, name:"종로구"},
        {id:2, name:"중구"},
        {id:3, name:"용산구"},
        {id:4, name:"성동구"},
        {id:5, name:"광진구"},
        {id:6, name:"동대문구"},
        {id:7, name:"중랑구"},
        {id:8, name:"성북구"},
        {id:9, name:"강북구"},
        {id:10, name:"도봉구"},
        {id:11, name:"노원구"},
        {id:12, name:"은평구"},
        {id:13, name:"서대문구"},
        {id:14, name:"마포구"},
        {id:15, name:"양천구"},
        {id:16, name:"강서구"},
        {id:17, name:"구로구"},
        {id:18, name:"금천구"},
        {id:19, name:"영등포구"},
        {id:20, name:"동작구"},
        {id:21, name:"관악구"},
        {id:22, name:"서초구"},
        {id:23, name:"강남구"},
        {id:24, name:"송파구"},
        {id:25, name:"강동구"},
    ]

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
        <select>
            <option>선호 지역</option>
            {seoul.map(gu => {
                return (
                    <option key={gu.id}>{gu.name}</option>
                )
            })}
        </select>
    )
}

export default Location