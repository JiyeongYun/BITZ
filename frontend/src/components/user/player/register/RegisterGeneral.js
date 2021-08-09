import React, { useState, useEffect, useContext } from "react";
import RegisterGeneralValidation from "components/user/player/register/RegisterGeneralValidation.js" // 유효성 검사 함수
import { dispatchSubmitContext } from "router/user/common/Register";
import UserApi from 'api/UserApi'

function RegisterGeneral({history}) {  
  // Context-Reducer
  const dispatch = useContext(dispatchSubmitContext)
  // State ***************************************************************
  // 입력 데이터
  const [values, setValues] = useState({
    email: "",
    name: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
    phoneNumber: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
  })
  // 유효성 검사 결과
  const [errors, setErrors] = useState({
    email: true,
    name: true,
    nickname: true,
    password: true,
    passwordConfirm: true,
    phoneNumber: true,
    birth: true,
  })
  // 최초 입력 확인
  const [isFirst, setIsFirst] = useState({
    email: true,
    name: true,
    nickname: true,
    password: true,
    passwordConfirm: true,
    phoneNumber: true,
    birth: true,
    birthYear: true,
    birthMonth: true,
    birthDay: true,
  })
  // 값을 모두 입력했는지 검증
  const [isValidated, setIsValidated] = useState(false)
  // 중복 체크
  const [duplicationCheck, setDuplicationCheck] = useState({
    emailCheck: false,
    nicknameCheck: false,
  })


  // useEffect ***************************************************************
  // PJW - 데이터 유효성 검증
  useEffect(()=>{
    setErrors({...RegisterGeneralValidation(values, isFirst)})
  }, [values, isFirst])
  // 데이터 유효성 검증 End

  // 전체 데이터 유효성 검사
  useEffect(()=>{
    let check = true
    Object.values(errors).forEach(value=>{
      check = check && !value
    })
    Object.values(duplicationCheck).forEach(value=>{
      check = check && value
    })
    setIsValidated(check)
  }, [errors, duplicationCheck])
  // 전체 데이터 유효성 검사 End


  // methods ***************************************************************
  // PJW - 데이터 입력 시 값 업데이트
  const updateValue = (event) => {
    let { name, value } = event.target;
    if (name==="password") {
      setValues({ ...values, [name]: value, passwordConfirm: ""});
      setIsFirst({...isFirst, passwordConfirm: true})
    } else {
      setValues({ ...values, [name]: value});
    }
  } // updateValue End

  // PJW - Focus out 시 유효성 검사
  const lateValidateValue = (event) => {
    const name = event.target.name
    if (name==="passwordConfirm") {
      setIsFirst({ ...isFirst, [name]: true});
    } else if (!errors.birth) {
      if (values.birthMonth.length ===1) {
        const birthValue = values.birthYear + '0' + values.birthMonth + values.birthDay;
        setValues({ ...values, birth: birthValue});
      } else if (values.birthDay.length ===1) {
        const birthValue = values.birthYear + values.birthMonth + '0' + values.birthDay;
        setValues({ ...values, birth: birthValue});
      } else {
        const birthValue = values.birthYear + values.birthMonth + values.birthDay;
        setValues({ ...values, birth: birthValue});
      }
    }
  } // lateValidateValue End

  // PJW - SNS 회원가입 버튼 클릭
  const onGoogleRegister = () => {
    alert('소셜 로그인 기능을 빨리 구현하세요!');
    console.log(values, errors, isValidated);
  } // onGoogleRegister End

  // PJW - 회원가입 버튼 클릭
  const onRegister = () => {
    const data = {
      birth: values.birth,
      email: values.email,
      name: values.name,
      password: values.password,
      phone: values.phoneNumber,
      nickname: values.nickname,
    }
    
    UserApi.requestJoin(
      data,
      res => {
        alert("회원가입이 완료되었습니다!")
        dispatch({type: "SUBMIT", value: values.email})
        history.push("/accounts/login")
      },
      err => {
        console.log(err)
      }
    )
  } // onRegister End

  // PJW - 에러 메시지 노출을 위해 최초 입력인지 확인
  const updateIsFirst = (event) => {
    setIsFirst({...isFirst, [event.target.name]: false})
    if (event.target.name === "birthYear" || event.target.name === "birthMonth" || event.target.name === "birthDay") {
      lateValidateValue(event)
    }
  } // updateIsFirst End

  // PJW - 이메일 중복 체크
  const onEmailCheck = () => {
    UserApi.EmailCheck(
      values,
      res => {
        alert('사용 가능한 이메일입니다.')
        setDuplicationCheck({...duplicationCheck, emailCheck: true})
      },
      err => {
        if (err.response.status === 404) {
          alert('이미 사용 중인 이메일입니다.')
        } else console.log(err.response)
      }
    )
  } // onEmailCheck End

  // PJW - 닉네임 중복 체크
  const onNicknameCheck = () => {
    UserApi.NicknameCheck(
      values,
      res => {
        alert('사용 가능한 닉네임입니다.')
        setDuplicationCheck({...duplicationCheck, nicknameCheck: true})
      },
      err => {
        if (err.response.status === 404) {
          alert('이미 사용 중인 닉네임입니다.')
        } else console.log(err.response)
      }
    )
  } // onNicknameCheck End
  
  
  // view ***************************************************************
  return(
    <div className="registerForm">
      {/* 중앙 영역 */}
      <div className="registerForm__center">
        {/*  이메일 */}
        <div className="register__email registerForm__component">
          <label>이메일</label>
          <br />
          <input className="inputBox" type="email" name="email" value={values.email} onChange={updateValue} onBlur={updateIsFirst} autoCapitalize="none"></input>
          <div className="errorMessage">{errors.email}</div>
          <button
          type="sumbit"
          onClick={onEmailCheck}
          className={!errors.email ? "registerForm__button duplicationCheck__button": "disabled registerForm__button duplicationCheck__button"}>
            중복체크
          </button>
        </div>
        {/* 이름 */}
        <div className="register__name registerForm__component">
          <label>이름</label>
          <br />
          <input className="inputBox" type="text" name="name" value={values.name} onChange={updateValue} onBlur={updateIsFirst}></input>
          <div className="errorMessage">{errors.name}</div>
        </div>
        {/* 닉네임 */}
        <div className="register__nickname registerForm__component">
          <label>닉네임</label>
          <br />
          <input className="inputBox" type="text" name="nickname" value={values.nickname} onChange={updateValue} onBlur={updateIsFirst}></input>
          <div className="errorMessage">{errors.nickname}</div>
          <button
          type="sumbit"
          onClick={onNicknameCheck}
          className={!errors.nickname ? "registerForm__button duplicationCheck__button": "disabled registerForm__button duplicationCheck__button"}>
            중복체크
          </button>
        </div>
        {/* 비밀번호 */}
        <div className="register__password registerForm__component">
          <label>비밀번호</label>
          <br />
          <input className="inputBox" type="password" name="password" value={values.password} onChange={updateValue} onBlur={updateIsFirst}></input>
          <div className="errorMessage">{errors.password}</div>
        </div>
        {/* 비밀번호 확인 */}
        <div className="register__passwordConfirm registerForm__component">
          <label>비밀번호 확인</label>
          <br />
          <input className="inputBox" type="password" name="passwordConfirm" value={values.passwordConfirm} onChange={updateValue} onBlur={updateIsFirst} onFocus={lateValidateValue}></input>
          <div className="errorMessage">{errors.passwordConfirm}</div>
        </div>
        {/* 핸드폰 번호 */}
        <div className="register__phoneNumber registerForm__component">
          <label>핸드폰 번호( '-'를 제외하고 입력 : 01012345678 )</label>
          <br />
          <input className="inputBox" type="tel" name="phoneNumber" value={values.phoneNumber} onChange={updateValue} onBlur={updateIsFirst}></input>
          <div className="errorMessage">{errors.phoneNumber}</div>
        </div>
        {/* 생년월일 */}
        <div className="register__birth registerForm__component">
          <label>생년월일</label>
          <div className="register__birthForm">
            {/* 년 */}
            <input className="register__birthYear" type="text" name="birthYear" value={values.birthYear} onChange={updateValue} onBlur={updateIsFirst} maxLength="4" placeholder="연(4자)"></input>년
            {/* 월 */}
            <span>
                <select className="register__birthMonth" id="mm" name="birthMonth" onChange={updateValue} onBlur={updateIsFirst}>
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
            <input className="register__birthDay" type="text" name="birthDay" value={values.birthDay} onChange={updateValue} onBlur={updateIsFirst} maxLength="2" placeholder="일"></input>일
          </div>
          <div className="errorMessage">{errors.birth}</div>
        </div>

        <button
          type="sumbit"
          onClick={onRegister}
          className={isValidated ? "registerForm__button register__button": "disabled registerForm__button register__button"}>
            회원가입
        </button>
        <button className="googleLogin" onClick={onGoogleRegister}>
          <img src="/images/google_logo.png" alt="sns_logo" id="google__logo" />
          <span>구글 계정으로 회원가입</span>
        </button>
      </div>
    </div>
  )
}

export default RegisterGeneral