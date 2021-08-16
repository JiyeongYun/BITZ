import React, { useCallback, useContext, useEffect, useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { store } from 'store/store.js'; // store import (store)
import ImgApi from 'api/ImgApi';
import UserApi from 'api/UserApi';

function Header() {
  // 전역 상태 관리 (store)
  const globalState = useContext(store);
  const { value, dispatch } = globalState;
  const [isScrollTop, setIsScrollTop] = useState(true)

  // 프로필 이미지 State
  const [imgUrl, setImgUrl] = useState(null)

  // 유저 정보 State
  const [userData, setUserData] = useState([])
  
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

  // 사진을 가져오는 함수
  useEffect(() => {
    const params = {email : value.isLogin}
    if (value.userKind === "player" ) {

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

      UserApi.myprofile(
        params,
        res => {
          setUserData(res.data)
        },
        err => {
          console.log(err)
        }
      )
    } else if (value.userKind === "business" ) {

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

      UserApi.BusMyProfile(
        params,
        res => {
          setUserData(res.data)
        },
        err => {
          console.log(err)
        }
      )
    }
  }, [value.isLogin, value.userKind])

  // 로그아웃 함수
  const onLogout = () => {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("currentUserbusiness")
    dispatch({ type: "LOGIN", value: "" })
    window.location.href="/accounts/login"
  };

  // 메뉴 보여주기
  const showMenu = () => {
    let menu = document.querySelector(".right_side > .profile_info").style
    if (menu.display === 'block') {
      menu.display = 'none' 
    } else {
      menu.display = 'block'
    }
  }

  return (
    <div className={isScrollTop ? "header__container" : "header__container header__shadow"}>
      <div className="header">
        <Link to="/">
          <img className="header__symbol" src="/images/symbol.png" alt="logo" />
        </Link>
        <div className="header__icons">
          {value.isLogin ? (
            <div className="right_side">
              <img src={imgUrl} alt="my_profile" onClick={showMenu} />
              <div className="profile_info">
                <div className="user__info">
                  <p>{userData.name}님</p>
                  <p>{userData.email}</p>
                </div>
                <hr />
                <div className="link_list">
                  {value.userKind === 'player' ? <Link><img src="/images/reservation.png" alt="res_logo" />예약확인</Link> : null}
                  <Link to={`/accounts/profile/`+userData.email}><img src="/images/profile_black.png" alt="profile_logo" />마이페이지</Link>
                </div>
                <button onClick={onLogout}>로그아웃</button>
              </div>
            </div>
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
