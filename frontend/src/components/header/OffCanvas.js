import React from 'react'
import './OffCanvas.css'

function OffCanvas({toggleCanvas}){
    return (
    <div>
      <img className="offcanvas__logo" src="/images/logo.png" alt="symbol" />
      <div className="offcanvas__links">
        <p>BITZ 소개</p>
        <p>공지사항</p>
        <div className="line"></div>
        <p>자주 묻는 질문</p>
        <p>문의 사항</p>
        <div className="line"></div>
        <p>자유 게시판</p>
        <div className="line"></div>
        <p onClick={toggleCanvas}>닫기</p>
      </div>
    </div>
    )
}
export default OffCanvas