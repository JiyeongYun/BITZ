import React, { useState } from "react";

function RegisterBusiness() {
  // State
  const [values, setValues] = useState({
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
    phoneNumber: "",
    birth: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    businessRegistration: "",
  })

  // methods
  const updateValue = (event) => {
    const { name, value } = event.target;
    if (name==="birthYear") {
      const birthValue = value + values.birthMonth + values.birthDay;
      setValues({ ...values, [name]: value, birth: birthValue});
    } else if (name==="birthMonth") {
      const birthValue = values.birthYear + value + values.birthDay;
      setValues({ ...values, [name]: value, birth: birthValue});
    } else if (name==="birthDay") {
      const birthValue = values.birthYear + values.birthMonth + value;
      setValues({ ...values, [name]: value, birth: birthValue});
    } else {
      setValues({ ...values, [name]: value});
    }
  }
  const onGoogleRegister = () => {
    alert('소셜 로그인 기능을 빨리 구현하세요!')
    console.log(values)
  }
  const onRegister = () => {
    alert('API 연결이 필요합니다!')
    console.log(values)
  }


  return(
    <div className="registerForm">
      {/* 좌측 영역 */}
      <div>
        <img className="register__logo" src="/images/logo.png" alt="logo" />
      </div>

      {/* 중앙 영역 */}
      <div className="registerForm__center">
        {/*  이메일 */}
        <div className="register__email">
          <label>이메일</label>
          <br />
          <input className="inputBox" type="email" name="email" value={values.email} onChange={updateValue}></input>
          <button className="registerForm__button duplicateCheck__button">중복체크</button>
        </div>
        {/* 이름 */}
        <div className="register__name">
          <label>이름</label>
          <br />
          <input className="inputBox" type="text" name="name" value={values.name} onChange={updateValue}></input>
        </div>
        {/* 비밀번호 */}
        <div className="register__password">
          <label>비밀번호</label>
          <br />
          <input className="inputBox" type="text" name="password" value={values.password} onChange={updateValue}></input>
        </div>
        {/* 비밀번호 확인 */}
        <div className="register__passwordConfirm">
          <label>비밀번호 확인</label>
          <br />
          <input className="inputBox" type="text" name="passwordConfirm" value={values.passwordConfirm} onChange={updateValue}></input>
        </div>
        {/* 핸드폰 번호 */}
        <div className="register__phoneNumber">
          <label>핸드폰 번호</label>
          <br />
          <input className="inputBox" type="text" name="phoneNumber" value={values.phoneNumber} onChange={updateValue}></input>
        </div>
        {/* 생년월일 */}
        <div className="register__birth">
          <label>생년월일</label>
          <br />
          {/* 년 */}
          <input className="register__birthYear" type="text" name="birthYear" value={values.birthYear} onChange={updateValue} maxLength="4" placeholder="년(4자)"></input>년
          {/* 월 */}
          <span>
              <select className="register__birthMonth" id="mm" name="birthMonth" onChange={updateValue}>
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
          <input className="register__birthDay" type="text" name="birthDay" value={values.birthDay} onChange={updateValue} maxLength="2" placeholder="일"></input>일
        </div>
        {/* 사업자 등록증 파일 업로드 */}
        <div className="register__businessRegistration">
          <label>사업자 등록증 파일 업로드</label>
          <br />
          {/* type file 형태로 바꾸고 업로드 가능하게 만들기 */}
          <input className="inputBox inputBox__businessRegistration" type="text"></input><button className="registerForm__button businessRegistration__button">업로드</button>
        </div>

        <button className="registerForm__button register__button" type="sumbit" onClick={onRegister}>회원가입</button>
        <div className="snsLogin">
          <button className="registerForm__button snsLogin__button" onClick={onGoogleRegister}>
            <img className="snsLogin__logo" src="/images/google_logo.png" alt="sns_logo" />
            구글 계정으로 회원가입
          </button>
        </div>
        
      </div>

      {/* 우측 영역 */}
      <div></div>
    </div>
  )
}

export default RegisterBusiness