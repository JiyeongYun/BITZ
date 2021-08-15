import React, { useCallback, useContext, useEffect, useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { store } from 'store/store.js'; // store import (store)
import ImgApi from 'api/ImgApi';

function Header(props) {
  // 전역 상태 관리 (store)
  const globalState = useContext(store);
  const [isScrollTop, setIsScrollTop] = useState(true)

  // 프로필 이미지 State
  const [imgUrl, setImgUrl] = useState(null)
  
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

  useEffect(() => {
    const params = {email : globalState.value.isLogin}
    if (globalState.value.userKind === "player" ) {
      ImgApi.getUserImg(
        params,
        res => {
          const url = window.URL.createObjectURL(new Blob([res.data]))
          setImgUrl(url)
        },
        err => {
          console.log(err)
        }
      )
    } else if (globalState.value.userKind === "business" ) {
      ImgApi.getBusImg(
        params,
        res => {
          const url = window.URL.createObjectURL(new Blob([res.data]))
          setImgUrl(url)
        },
        err => {
          console.log(err)
        }
      )
    }
  }, [globalState.value.isLogin, globalState.value.userKind])

  return (
    <div className={isScrollTop ? "header__container" : "header__container header__shadow"}>
      <div className="header">
        <Link to="/">
          <img className="header__symbol" src="/images/symbol.png" alt="logo" />
        </Link>
        <div className="header__icons">
          {globalState.value.isLogin ? (
            <Link to={`/accounts/profile/${globalState.value.isLogin}`}>
              <img src={imgUrl} alt="my_profile" />
            </Link>
          ) : (
            <Link to="/accounts/login">
              <p className="icon">로그인</p>
            </Link>
          )}

          {/* 메뉴바 로고 삭제 */}
          {/* <div className="icon menu__icon" onClick={props.toggleCanvas}>
            <div className="circle__icon"></div>
            <div className="circle__icon"></div>
            <div className="circle__icon"></div>
          </div> */}
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
