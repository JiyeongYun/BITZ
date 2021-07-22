import React, { useState } from 'react'
import "./Header.css"
import OffCanvas from './OffCanvas'

function Header(){
  const [offcanvas, setOffcanvas] = useState(false)
  const toggleCanvas = () => {
    setOffcanvas(!offcanvas)
  }


  return (
    <div>
      <div className="header">
        <img className="header__symbol" src="/images/symbol.png" alt="logo" />
        <div className="header__icons">
          <p className="icon">로그인</p>
          <div className="icon menu__icon" onClick={toggleCanvas}>
            <div className="circle__icon"></div>
            <div className="circle__icon"></div>
            <div className="circle__icon"></div>
          </div>
        </div>
      </div>
      <div className={offcanvas ? "grey__canvas grey__canvas__show": "grey__canvas"} onClick={toggleCanvas}></div>
      <div className={offcanvas ? "offcanvas__show offcanvas": "offcanvas"}>
        <i className="fas fa-times fa-2x offcanvas__close" onClick={toggleCanvas}></i>
        <OffCanvas />
      </div>
    </div>
  )
}

export default Header