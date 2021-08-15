import React, { useContext, useEffect, useState } from 'react';
import MyInfo from '../../../components/user/player/profile/MyInfo';
import Score from '../../../components/user/player/profile/Score';
import MyGym from '../../../components/user/business/profile/MyGym';
import './Profile.css';
import { Link } from 'react-router-dom';
import { store } from 'store/store.js'; // store import (store)
import UserApi from 'api/UserApi';
import ImgApi from 'api/ImgApi';

const Profile = ({ history }) => {
  // 전역 상태 관리 (store)
  const globalState = useContext(store);
  const { value, dispatch } = globalState;
  const isLogin = value.isLogin
  const { userKind, userObj } = value; // 플레이어, 비즈니스 구분용 전역 State

  // 유저 정보가 담긴 State
  const [userData, setUserData] = useState({email: "", birth: ""})
  const [imgUrl, setImgUrl] = useState(null)
  const [regUrl, setRegUrl] = useState(null)
  const [files, setFiles] = useState(null)
  const [regFiles, setRegFiles] = useState("")
  const [imgupdate, setImgupdate] = useState(true)
  const [updateReg, setUpdateReg] = useState(true)

  const onLogout = () => {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("currentUserbusiness")
    dispatch({ type: "LOGIN", value: "" })
    history.push('/')
  };
  
  
  // 유저 정보를 DB에서 가져오기
  useEffect(() => {
    if (userKind === 'player') {
      const params = {email:value.isLogin}
      UserApi.myprofile(
        params,
        res => {
          setUserData(res.data)
        },
        err => {
          console.log(err)
        }
      )
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
    } else if (userKind === 'business') {
      const params = {email:value.isLogin}
      UserApi.BusMyProfile(
        params,
        res => {
          setUserData(res.data)
        },
        err => {
          console.log(err)
        }
      )
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
  }, [value.isLogin, userKind, imgupdate])

  // 회원 탈퇴
  const removeUser = () => {
    const data = {
      email: value.isLogin,
      password: "",
    }
    if (userKind === "player") {
      if (window.confirm("탈퇴하면 회원 정보가 모두 삭제되며 복구할 수 없습니다.\n그래도 탈퇴 하시겠습니까?") === true) {
        UserApi.quitAccount(
          data,
          res => {
            alert('회원 탈퇴되었습니다.')
            localStorage.removeItem('currentUser')
            history.push('/accounts/login')
          },
          err => {
            console.log(err)
          }
        )
      }
    } else if (userKind === 'business') {
      if (window.confirm("탈퇴하면 회원 정보가 모두 삭제되며 복구할 수 없습니다.\n그래도 탈퇴 하시겠습니까?") === true) {
        UserApi.quitBusAccount(
          data,
          res => {
            alert('회원 탈퇴되었습니다.')
            localStorage.removeItem('currentUser')
            history.push('/accounts/login')
          },
          err => {
            console.log(err)
          }
        )
      }
    }
  }

  // 프로필 사진 업데이트
  const uploadImg = (e) => {
    e.preventDefault()
    const file = e.target.files[0]
    setFiles(file)
  }

  // 프로필 사진 업로드
  const submitImg = (e) => {
    e.preventDefault()
    if (files) {
      const formData = new FormData()
      formData.append("images", files, files.name)
      formData.append("email", isLogin)
  
      if (imgUrl) {
        if (userKind==="player") {
          ImgApi.updateUserImg(
            formData,
            res => {
              alert('프로필 사진이 수정 되었습니다.')
              setImgupdate(!imgupdate)
            }, err => {
              console.log(err.response)
            }
          )
        } else if (userKind === "business") {
          ImgApi.updateBusImg(
            formData,
            res => {
              alert('프로필 사진이 수정 되었습니다.')
              setImgupdate(!imgupdate)
            }, err => {
              console.log(err.response)
            }
          )
        }
      } else {
        if (userKind==="player") {
          ImgApi.uploadUserImg(
            formData,
            res => {
              alert('프로필 사진이 업로드 되었습니다.')
              setImgupdate(!imgupdate)
            }, err => {
              console.log(err.response)
            }
          )
        } else if (userKind === "business") {
          ImgApi.uploadBusImg(
            formData,
            res => {
              alert('프로필 사진이 업로드 되었습니다.')
              setImgupdate(!imgupdate)
            }, err => {
              console.log(err.response)
            }
          )
        }
      }
    } else {
       alert("파일을 등록해주세요.")
    }
  }
    
  // 프로필 사진 업로드 보여주기
  const showUpload = () => {
    const select = document.querySelector('.profile_img_update')
    if (select.style.display === "block") {
      select.style.display = "none"
    } else {
      select.style.display = "block"
    }
  }
  
  // 프로필 사진 삭제
  const deleteImg = () => {
    if (userKind === 'player') {
      ImgApi.deleteUserImg(
        {email: isLogin},
        res => {
          alert("프로필 이미지가 삭제되었습니다.")
          setImgupdate(!imgupdate)
          setImgUrl(null)
        },
        err => {
          console.log(err)
        }
      )
    } else if (userKind === 'business') {
      ImgApi.deleteBusImg(
        {email: isLogin},
        res => {
          alert("프로필 이미지가 삭제되었습니다.")
          setImgupdate(!imgupdate)
          setImgUrl(null)
        },
        err => {
          console.log(err)
        }
      )
    }
  }

  // 사업자 등록증 가져오기
  useEffect(() => {
    ImgApi.getRegImg(
      {email: isLogin},
      res => {
        const url = window.URL.createObjectURL(new Blob([res.data]))
        setRegUrl(url)
      },
      err => console.log(err)
    )
  }, [updateReg])

  // 사업자 등록증 수정
  const updateRegImg = () => {
    if (regFiles) {
      const formData = new FormData()
      formData.append("images", regFiles, regFiles.name)
      formData.append("email", isLogin)

      ImgApi.updateRegImg(
        formData,
        res => {
          alert("사업자 등록증이 수정되었습니다.")
          setUpdateReg(!updateReg)
        },
        err => {
          console.log(err)
        }
      )
    } else alert("파일을 등록해주세요.")
  }

  // 사업자 등록증 파일 onChange
  const uploadReg = (e) => {
    setRegFiles(e.target.files[0])
  }

  // 사업자 등록증 삭제
  const deleteRegImg = () => {

  }
      
  return (
    <div className="profile__div">
      <div className="user__profile">
        {imgUrl?<img src={imgUrl} alt="profile" onClick={showUpload} />:<img onClick={showUpload} src="/images/profile.png"/>}
        <div className="profile_img_update">
          <form name="img" encType="multipart/form-data" onSubmit={submitImg}>
            <input onChange={uploadImg} type="file" id="profile_img" className="img_upload" accept="image/*" />
            <button>업로드</button>
          </form>
          <button onClick={deleteImg}>삭제</button>
        </div>
        <p id="nickname">{userData.nickname}</p>
        <p id="email">{userData.email}</p>
        <p id="email">{userData.phone}</p>
        <p id="birth">{userData.birth.slice(0,4)}.{userData.birth.slice(4,6)}.{userData.birth.slice(6)}</p>
      </div>
      {/* 유저가 플레이어일 경우 */}
      {userKind==='player' && (
        <div className="left_right_profile">
          <Score userObj={userObj} userData={userData} />
          <MyInfo userObj={userObj} userData={userData} setUserData={setUserData} />
        </div>
      )}
      {/* 유저가 비즈니스일 경우 */}
      {userKind==="business" && (
        <>
          <div className="businessAccount">
            <p>은행 : {userData.bank}</p>
            <p>계좌 번호 : {userData.account}</p>
          </div>
          <MyGym gyminfo={userData.gymProfile}/>
          <div classNmae="business_registration">
            <img src={regUrl} alt="registration_img" />
            <div>
              <input type="file" accept="image/*" onChange={uploadReg} />
              <button onClick={updateRegImg}>수정</button>
              <button onClick={deleteRegImg}>삭제</button>
            </div>
          </div>
        </>
      )}
      {/* <hr/> */}
      <div className="accountSetting">
        <h2>계정 관리</h2>
        <Link to="/accounts/change_password">비밀번호 변경</Link>
        <span onClick={onLogout}>로그아웃</span>
        <Link to={`/accounts/profile/${value.isLogin}/update`}>회원 정보 수정</Link>
        <span className="quit__btn" onClick={removeUser}>회원 탈퇴</span>
      </div>
    </div>
  );
};

export default Profile;
