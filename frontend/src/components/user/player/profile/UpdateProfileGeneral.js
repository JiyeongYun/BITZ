import React, {useEffect, useState} from "react";
import UserApi from 'api/UserApi'

function UpdateProfileGeneral({userData, setUserData}) {  
  // PJW - 닉네임 중복 체크
  const onNicknameCheck = () => {
    UserApi.NicknameCheck(
      userData,
      res => {
        alert('사용 가능한 닉네임입니다.')
      },
      err => {
        if (err.response.status === 404) {
          alert('이미 사용 중인 닉네임입니다.')
        } else console.log(err.response)
      }
    )
  } // onNicknameCheck End

  // birth 관련 State
  const [birthYear, setBirthYear] = useState("")
  const [birthMonth, setBirthMonth] = useState("")
  const [birthDay, setBirthDay] = useState("")


  // userData.birth 추가하면 안됨!!
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
      birth: birth
    }

    UserApi.UpdateMyProfile(
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
      {/* 중앙 영역 */}
      <div className="registerForm__center">
        {/*  이메일 */}
        <div className="register__email registerForm__component">
          <label>이메일</label>
          <br />
          <input  disabled className="inputBox" type="email" name="email" value={userData.email}autoCapitalize="none"></input>
        </div>
        {/* 이름 */}
        <div className="register__name registerForm__component">
          <label>이름</label>
          <br />
          <input disabled className="inputBox" type="text" name="name" value={userData.name}></input>
        </div>
        {/* 닉네임 */}
        <div className="register__nickname registerForm__component">
          <label>닉네임</label>
          <br />
          <input className="inputBox" type="text" name="nickname" value={userData.nickname} onChange={onChange}></input>
          <button
          type="sumbit"
          onClick={onNicknameCheck}
          className="registerForm__button duplicationCheck__button">
            중복체크
          </button>
        </div>
        {/* 핸드폰 번호 */}
        <div className="register__phoneNumber registerForm__component">
          <label>핸드폰 번호( '-'를 제외하고 입력 : 01012345678 )</label>
          <br />
          <input onChange={onChange} maxLength="11" className="inputBox" type="tel" name="phone" value={userData.phone}></input>
        </div>
        {/* 생년월일 */}
        <div className="register__birth registerForm__component">
          <label>생년월일</label>
          <div className="register__birthForm">
            {/* 년 */}
            <input onChange={onChange} className="register__birthYear" type="text" name="birthYear" value={birthYear} maxLength="4" placeholder="연(4자)"></input>년
            {/* 월 */}
            <span>
                <select onChange={onChange} value={birthMonth} className="register__birthMonth" id="mm" name="birthMonth">
                    <option>월</option>
                    <option value="01">1</option>
                    <option value="02">2</option>
                    <option value="03">3</option>
                    <option value="04">4</option>
                    <option value="05">5</option>
                    <option value="06">6</option>
                    <option value="07">7</option>
                    <option value="08">8</option>
                    <option value="09">9</option>                                    
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select>
                <span> 월</span>
            </span>
            {/* 일 */}
            <input onChange={onChange} className="register__birthDay" type="text" name="birthDay" value={birthDay} maxLength="2" placeholder="일"></input>일
          </div>
        </div>

        <button
          type="sumbit"
          onClick={update}
          className="registerForm__button register__button">
            저장
        </button>
      </div>
    </div>
  )
}

export default UpdateProfileGeneral