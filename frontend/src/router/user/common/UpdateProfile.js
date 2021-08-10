import UserApi from "api/UserApi";
import React, { useContext, useEffect, useState } from "react";
import { store } from 'store/store.js';
import UpdateProfileGeneral from 'components/user/player/profile/UpdateProfileGeneral'

function UpdateProfile() {
  // store 에서 userKind(유저 종류)와 isLogin(email 정보) 가져오기 위해 사용
  const globalState = useContext(store);
  const { userKind, isLogin } = globalState.value;

  // 유저 정보를 담을 State
  const [userData, setUserData] = useState({birth: ""})

  // email을 통해 유저의 회원 정보를 가지고 온다
  useEffect(() => {
    if (userKind === 'player') {
      UserApi.myprofile(
        {email:isLogin},
        res => {
          setUserData(res.data)
        },
        err => {
          console.log(err.response)
        }
      )
    } else if (userKind === 'business') {
      UserApi.BusMyProfile(
        isLogin,
        res => {
          console.log(res)
        },
        err => {
          console.log(err.response)
        }
      )
    }
  }, [isLogin, userKind])

  return (
    <div className="updateprofile__container">
      {userKind === 'player' ? 
        <UpdateProfileGeneral userData={userData} setUserData={setUserData} />:
        <span>비즈니스</span>
      }
    </div>
  )};

export default UpdateProfile