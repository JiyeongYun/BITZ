import React from 'react'
import "./Header.css"

function Header(){
  return (
    <div className="header">
      <img className="header__logo" src="/images/logo.png" alt="logo" />
      <div className="header__icons">
        <p className="icon">로그인</p>
        <div className="icon menu__icon">
          <div className="circle__icon"></div>
          <div className="circle__icon"></div>
          <div className="circle__icon"></div>
        </div>
      </div>
    </div>
  )
}

export default Header