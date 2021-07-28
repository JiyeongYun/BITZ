import React from 'react'
import "./Header.css"
import { Link } from "react-router-dom"

function Header(props){
  // const [offcanvas, setOffcanvas] = useState(false)
  // const toggleCanvas = () => {
  //   setOffcanvas(!offcanvas)
  // }


  return (
    <div className="header__container">
      <div className="header">
        <Link to="/">
          <img className="header__symbol" src="/images/symbol.png" alt="logo" />
        </Link>
        <div className="header__icons">
          <Link to="/accounts/login"><p className="icon">로그인</p></Link>
          <div className="icon menu__icon" onClick={props.toggleCanvas}>
            <div className="circle__icon"></div>
            <div className="circle__icon"></div>
            <div className="circle__icon"></div>
          </div>
        </div>
        {/* <div className={offcanvas ? "grey__canvas grey__canvas__show": "grey__canvas"} onClick={toggleCanvas}></div>
        <div className={offcanvas ? "offcanvas__show offcanvas": "offcanvas"}>
          <OffCanvas />
        </div> */}
      </div>
    </div>
  )
}

export default Header