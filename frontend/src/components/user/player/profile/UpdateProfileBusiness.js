import React, {useEffect, useState} from "react";
import UserApi from 'api/UserApi'
import './UpdateProfileGeneral.css'

function UpdateProfileBusiness({userData, setUserData}) {  
  // birth 관련 State
  const [birthYear, setBirthYear] = useState("")
  const [birthMonth, setBirthMonth] = useState("")
  const [birthDay, setBirthDay] = useState("")

  useEffect(() => {
    setBirthYear(userData.birth ? userData.birth.slice(0,4):"")
    setBirthMonth(userData.birth ? userData.birth.slice(4,6):"")
    setBirthDay(userData.birth ? userData.birth.slice(6,8):"")
  }, [userData.birth])

  // data 값 변경
  const onChange = (e) => {
    const {target: {name, value}} = e
    if (name === "birthYear") {
      setBirthYear(value)
    } else if (name === "birthMonth") {
      setBirthMonth(value)
    } else if (name === "birthDay") {
      setBirthDay(value)
    } else setUserData({...userData, [name]:value})
  }
  
  // 저장 버튼 클릭 시
  const update = () => {
    const birthDay_ = birthDay.length === 1 ? "0"+birthDay : birthDay
    const birth = birthYear + birthMonth + birthDay_
    const data = {
      ...userData,
      birth: birth,
    }

    UserApi.UpdateBusMyProfile(
      data,
      res => {
        alert("회원 정보가 수정되었습니다.")
      },
      err => {
        alert("값을 확인하여 주세요.")
      }
    )
  }
  
  // view ***************************************************************
  return(
    <div className="registerForm">
      <h5>마이페이지 수정</h5>
      {/*  이메일 */}
      <div className="register__email registerForm__component">
        <input
          className="inputBox"
          type="email"
          name="email"
          value={userData.email}
          autoCapitalize="none"
          disabled
        ></input>
      </div>
      {/* 이름 */}
      <div className="register__name registerForm__component">
        <input
          className="inputBox"
          type="text"
          name="name"
          value={userData.name}
          onChange={onChange}
        ></input>
      </div>
      {/* 핸드폰 번호 */}
      <div className="register__phoneNumber registerForm__component">
        <input
          className="inputBox"
          type="tel"
          name="phone"
          value={userData.phone}
          onChange={onChange}
        ></input>
      </div>
      {/* 생년월일 */}
      <div className="register__birth registerForm__component">
        <div className="register__birthForm">
          {/* 년 */}
          <input
            className="register__birthYear"
            type="text"
            name="birthYear"
            value={birthYear}
            onChange={onChange}
            maxLength="4"
            placeholder="연(4자)"
          ></input>
          {/* 월 */}
          <span>
            <select
              className="register__birthMonth"
              id="mm"
              name="birthMonth"
              onChange={onChange}
              value={birthMonth}
            >
              <option>월</option>
              <option value="01">1월</option>
              <option value="02">2월</option>
              <option value="03">3월</option>
              <option value="04">4월</option>
              <option value="05">5월</option>
              <option value="06">6월</option>
              <option value="07">7월</option>
              <option value="08">8월</option>
              <option value="09">9월</option>
              <option value="10">10월</option>
              <option value="11">11월</option>
              <option value="12">12월</option>
            </select>
          </span>
          {/* 일 */}
          <input
            className="register__birthDay"
            type="text"
            name="birthDay"
            value={birthDay}
            onChange={onChange}
            maxLength="2"
            placeholder="일"
          ></input>
        </div>
      </div>
      {/* 계좌 은행 */}
      <div className="register__bank">
        <input
          className="inputBox"
          type="text"
          name="bank"
          value={userData.bank}
          onChange={onChange}
        ></input>
      </div>
      {/* 계좌 번호 */}
      <div className="register__account registerForm__component">
        <input
          className="inputBox"
          type="text"
          name="account"
          value={userData.account}
          onChange={onChange}
        ></input>
      </div>
      <button
        type="sumbit"
        onClick={update}
        className='registerForm__button register__button'
      >
        저장
      </button>
    </div>
  )
}

export default UpdateProfileBusiness