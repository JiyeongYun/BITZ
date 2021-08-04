import React, { useCallback, useContext, useEffect, useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { store } from 'store/store.js'; // store import (store)

function Header(props) {
  // 전역 상태 관리 (store)
  const globalState = useContext(store);
  const [isScrollTop, setIsScrollTop] = useState(true)
  
  // const [offcanvas, setOffcanvas] = useState(false)
  // const toggleCanvas = () => {
  //   setOffcanvas(!offcanvas)
  // }
  // <div>아이콘 제작자 <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/kr/" title="Flaticon">www.flaticon.com</a></div>
  
  const handleScroll = useCallback(() => {
    if (!window.scrollY && !isScrollTop) {
      setIsScrollTop(true);
      return;
    }
    if (window.scrollY && isScrollTop) {
      setIsScrollTop(false);
      return;
    }
  },[isScrollTop])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrollTop, handleScroll]);

  return (
    <div className={isScrollTop ? "header__container" : "header__container header__shadow"}>
      <div className="header">
        <Link to="/">
          <img className="header__symbol" src="/images/symbol.png" alt="logo" />
        </Link>
        <div className="header__icons">
          {globalState.value.isLogin ? (
            <Link to={`/accounts/profile/${globalState.value.isLogin}`}>
              <img src={process.env.PUBLIC_URL + `/images/profile.png`} width="20px" alt="my_profile" />
            </Link>
          ) : (
            <Link to="/accounts/login">
              <p className="icon">로그인</p>
            </Link>
          )}
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
  );
}

export default Header;
