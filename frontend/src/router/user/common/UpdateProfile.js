import UserApi from "api/UserApi";
import React, { useContext, useEffect, useState } from "react";
import { store } from 'store/store.js';
import UpdateProfileGeneral from 'components/user/player/profile/UpdateProfileGeneral'
import UpdateProfileBusiness from 'components/user/player/profile/UpdateProfileBusiness'

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
          console.log(err)
        }
      )
    } else if (userKind === 'business') {
      UserApi.BusMyProfile(
        {email:isLogin},
        res => {
          setUserData(res.data)
        },
        err => {
          console.log(err)
        }
      )
    }
  }, [isLogin, userKind])

  return (
    <div className="updateprofile__container">
      {userKind === 'player' ? 
        <UpdateProfileGeneral userData={userData} setUserData={setUserData} />:
        <UpdateProfileBusiness userData={userData} setUserData={setUserData} />
      }
    </div>
  )};

export default UpdateProfile