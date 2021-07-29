import React, { useState, useEffect, useContext } from 'react';
import RegisterBusinessValidation from 'components/user/business/register/RegisterBusinessValidation';
import './RegisterBusiness.css';
import { dispatchSubmitContext } from 'router/user/common/Register';
import axios from 'axios';

function RegisterBusiness() {
  // Context-Reducer
  const dispatch = useContext(dispatchSubmitContext);
  // State ***************************************************************
  // 입력 데이터
  const [values, setValues] = useState({
    email: '',
    name: '',
    password: '',
    passwordConfirm: '',
    phoneNumber: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    businessRegistration: '',
    file: {},
  });
  // 유효성 검사 결과
  const [errors, setErrors] = useState({
    email: true,
    name: true,
    password: true,
    passwordConfirm: true,
    phoneNumber: true,
    birth: true,
    businessRegistration: true,
  });
  // 최초 입력 확인
  const [isFirst, setIsFirst] = useState({
    email: true,
    name: true,
    password: true,
    passwordConfirm: true,
    phoneNumber: true,
    birth: true,
    birthYear: true,
    birthMonth: true,
    birthDay: true,
  });
  // 값을 모두 입력했는지 검증
  const [isValidated, setIsValidated] = useState(false);
  // 중복 체크
  const [duplicationCheck, setDuplicationCheck] = useState({
    emailCheck: false,
  });

  // useEffect ***************************************************************
  // PJW - 데이터 유효성 검증
  useEffect(() => {
    setErrors({ ...RegisterBusinessValidation(values, isFirst) });
  }, [values, isFirst]);
  // 데이터 유효성 검증 End

  // 전체 데이터 유효성 검사
  useEffect(() => {
    let check = true;
    Object.values(errors).forEach((value) => {
      check = check && !value;
    });
    Object.values(duplicationCheck).forEach((value) => {
      check = check && value;
    });
    setIsValidated(check);
  }, [errors, duplicationCheck]);
  // 전체 데이터 유효성 검사 End

  // methods ***************************************************************
  // PJW - 데이터 입력 시 값 업데이트
  const updateValue = (event) => {
    let { name, value } = event.target;
    if (name === 'password') {
      setValues({ ...values, [name]: value, passwordConfirm: '' });
      setIsFirst({ ...isFirst, passwordConfirm: true });
    } else {
      setValues({ ...values, [name]: value });
    }
  }; // updateValue End

  // PJW - Focus out 시 유효성 검사
  const lateValidateValue = (event) => {
    const name = event.target.name;
    if (name === 'passwordConfirm') {
      setIsFirst({ ...isFirst, [name]: true });
    } else if (!errors.birth) {
      if (values.birthMonth.length === 1) {
        const birthValue = values.birthYear + '0' + values.birthMonth + values.birthDay;
        setValues({ ...values, birth: birthValue });
      } else {
        const birthValue = values.birthYear + values.birthMonth + values.birthDay;
        setValues({ ...values, birth: birthValue });
      }
    }
  }; // lateValidateValue End

  // PJW - SNS 회원가입 버튼 클릭
  const onGoogleRegister = () => {
    alert('소셜 로그인 기능을 빨리 구현하세요!');
    console.log(values, errors, isValidated);
  }; // onGoogleRegister End

  // PJW - 회원가입 버튼 클릭
  const onRegister = () => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('password', values.password);
    formData.append('phone', values.phoneNumber);
    formData.append('birth', values.birthYear + values.birthMonth + values.birthDay);
    formData.append('businessRegistration', values.file);

    axios.post('http://127.0.0.1:8080/accountbusiness/createbusiness', formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    // dispatch({ type: 'SUBMIT', value: values.email });
  }; // onRegister End

  // PJW - 에러 메시지 노출을 위해 최초 입력인지 확인
  const updateIsFirst = (event) => {
    setIsFirst({ ...isFirst, [event.target.name]: false });
    if (
      event.target.name === 'birthYear' ||
      event.target.name === 'birthYear' ||
      event.target.name === 'birthYear'
    ) {
      lateValidateValue(event);
    }
  }; // updateIsFirst End

  // PJW - 이메일 중복 체크
  const onEmailCheck = () => {
    alert('이메일 중복 확인');
    setDuplicationCheck({ ...duplicationCheck, emailCheck: true });
  }; // onEmailCheck End

  // PJW - 파일 업로드
  const fileUploaded = (event) => {
    console.log(event.target.files[0]);
    // const formData = new FormData().append('file', event.target.files[0]);
    const converted = event.target.value.split('\\');
    setValues({
      ...values,
      businessRegistration: converted[converted.length - 1],
      file: event.target.files[0],
    });
  };

  // view ***************************************************************
  return (
    <div className="registerForm">
      {/* 좌측 영역 */}
      <div>
        <img className="register__logo" src="/images/logo.png" alt="logo" />
      </div>

      {/* 중앙 영역 */}
      <div className="registerForm__center">
        {/*  이메일 */}
        <div className="register__email registerForm__component">
          <label>이메일</label>
          <br />
          <input
            className="inputBox"
            type="email"
            name="email"
            value={values.email}
            onChange={updateValue}
            onBlur={updateIsFirst}
            autoCapitalize="none"
          ></input>
          <div className="errorMessage">{errors.email}</div>
          <button
            type="sumbit"
            onClick={onEmailCheck}
            className={
              !errors.email
                ? 'registerForm__button duplicationCheck__button'
                : 'disabled registerForm__button duplicationCheck__button'
            }
          >
            중복체크
          </button>
        </div>
        {/* 이름 */}
        <div className="register__name registerForm__component">
          <label>이름</label>
          <br />
          <input
            className="inputBox"
            type="text"
            name="name"
            value={values.name}
            onChange={updateValue}
            onBlur={updateIsFirst}
          ></input>
          <div className="errorMessage">{errors.name}</div>
        </div>
        {/* 비밀번호 */}
        <div className="register__password registerForm__component">
          <label>비밀번호</label>
          <br />
          <input
            className="inputBox"
            type="password"
            name="password"
            value={values.password}
            onChange={updateValue}
            onBlur={updateIsFirst}
          ></input>
          <div className="errorMessage">{errors.password}</div>
        </div>
        {/* 비밀번호 확인 */}
        <div className="register__passwordConfirm registerForm__component">
          <label>비밀번호 확인</label>
          <br />
          <input
            className="inputBox"
            type="password"
            name="passwordConfirm"
            value={values.passwordConfirm}
            onChange={updateValue}
            onBlur={updateIsFirst}
            onFocus={lateValidateValue}
          ></input>
          <div className="errorMessage">{errors.passwordConfirm}</div>
        </div>
        {/* 핸드폰 번호 */}
        <div className="register__phoneNumber registerForm__component">
          <label>핸드폰 번호</label>
          <br />
          <input
            className="inputBox"
            type="tel"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={updateValue}
            onBlur={updateIsFirst}
          ></input>
          <div className="errorMessage">{errors.phoneNumber}</div>
        </div>
        {/* 생년월일 */}
        <div className="register__birth registerForm__component">
          <label>생년월일</label>
          <div className="register__birthForm">
            {/* 년 */}
            <input
              className="register__birthYear"
              type="text"
              name="birthYear"
              value={values.birthYear}
              onChange={updateValue}
              onBlur={updateIsFirst}
              maxLength="4"
              placeholder="연(4자)"
            ></input>
            년{/* 월 */}
            <span>
              <select
                className="register__birthMonth"
                id="mm"
                name="birthMonth"
                onChange={updateValue}
                onBlur={updateIsFirst}
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
              value={values.birthDay}
              onChange={updateValue}
              onBlur={updateIsFirst}
              maxLength="2"
              placeholder="일"
            ></input>
            일
          </div>
          <div className="errorMessage">{errors.birth}</div>
        </div>
        {/* 사업자 등록증 파일 업로드 */}
        <div className="register__businessRegistration">
          <label>사업자 등록증 파일 업로드</label>
          <br />
          {/* type file 형태로 바꾸고 업로드 가능하게 만들기 */}
          <input
            type="text"
            id="show-upload"
            className="inputBox inputBox__businessRegistration"
            value={values.businessRegistration}
            disabled="disabled"
          ></input>
          <label
            className="registerForm__button businessRegistration__button"
            htmlFor="real-upload"
          >
            업로드
          </label>
          <input type="file" id="real-upload" className="upload-hidden" onChange={fileUploaded} />
          <div className="errorMessage">{errors.businessRegistration}</div>
        </div>

        <button
          type="sumbit"
          onClick={onRegister}
          className={
            isValidated
              ? 'registerForm__button register__button'
              : 'disabled registerForm__button register__button'
          }
        >
          회원가입
        </button>
        <div className="registerForm__snsLogin">
          <button
            className="registerForm__button registerForm__snsLogin__button"
            onClick={onGoogleRegister}
          >
            <img
              className="registerForm__snsLogin__logo"
              src="/images/google_logo.png"
              alt="sns_logo"
            />
            구글 계정으로 회원가입
          </button>
        </div>
      </div>

      {/* 우측 영역 */}
      <div></div>
    </div>
  );
}

export default RegisterBusiness;
