import React from 'react'
import { Link } from 'react-router-dom'

function NoGameList () {

    return (
        <div className="nogame">
            <div className="content">
                <h2>예약 리스트가 없습니다</h2>
                <Link to="/">예약하러 갈래요!</Link>
            </div>
        </div>
    )
}

export default NoGameList