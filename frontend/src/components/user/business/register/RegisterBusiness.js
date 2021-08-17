import React, { useState, useEffect } from 'react';
import RegisterBusinessValidation from 'components/user/business/register/RegisterBusinessValidation';
import './RegisterBusiness.css';
import UserApi from 'api/UserApi';
import ImgApi from 'api/ImgApi';

function RegisterBusiness({history}) {
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
    bank: '',
    account: '',
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
    bank: true,
    account: true,
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
    bank: true,
    account: true,
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
    handleInput(name, value)
  }; // updateValue End

  
  // input 박스 done 클래서 적용
  const handleInput = (id, value) => {
    if (value) {
      document.querySelector(`#${id}`).classList.add('done')
    } else {
      document.querySelector(`#${id}`).classList.add('done')
    }
  }

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

  // JHW - 회원가입 버튼 클릭
  const onRegister = () => {
    let birth = ""
    if (values.birthDay.length === 1) {
      const birth_ = values.birthYear + values.birthMonth + "0" + values.birthDay
      birth = birth_
    } else {
      const birth_ = values.birthYear + values.birthMonth + values.birthDay
      birth = birth_
    }
    const data = {
      email: values.email,
      name: values.name,
      password: values.password,
      phone: values.phoneNumber,
      bank: values.bank,
      account: values.account,
      birth,
    }
    
    const ImgData = new FormData()
    ImgData.append("email", values.email)
    ImgData.append("images", values.file, values.file.name)
    
    UserApi.requestBusinessJoin(
      data,
      res => {
        ImgApi.uploadRegImg(
          ImgData,
          res => {
            alert("회원가입이 완료되었습니다!")
            history.push("/accounts/login")
          },
          err => {
            console.log(err)
          }
        )
      },
      err => {
        console.log(err.response)
      }
    );    
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
    const data = {
      email: values.email,
      account: "",
      bank: "",
      birth: "",
      name: "",
      password: "",
      phone: "",
    }
    UserApi.BusEmailCheck(
      data,
      res => {
        alert('사용 가능한 이메일 입니다.');
        setDuplicationCheck({ ...duplicationCheck, emailCheck: true });
      },
      err => {
        if (err.response.status === 404 ) {
          alert('이미 사용 중인 이메일입니다.')
        } else console.log(err)
      }
    )
  }; // onEmailCheck End

  // PJW - 파일 업로드
  const fileUploaded = (event) => {
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
    <div className="registerForm__center">
      {/*  이메일 */}
      <div className="register__email registerForm__component">
        <input
          className="inputBox"
          type="email"
          name="email"
          id="email"
          value={values.email}
          placeholder="이메일 주소"
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
              ? 'duplicationCheck__button'
              : 'disabled duplicationCheck__button'
          }
        >
          중복체크
        </button>
      </div>
      {/* 이름 */}
      <div className="register__name registerForm__component">
        <input
          className="inputBox"
          type="text"
          name="name"
          id="name"
          placeholder="이름"
          value={values.name}
          onChange={updateValue}
          onBlur={updateIsFirst}
        ></input>
        <div className="errorMessage">{errors.name}</div>
      </div>
      {/* 비밀번호 */}
      <div className="register__password registerForm__component">
        <input
          className="inputBox"
          type="password"
          name="password"
          id="password"
          placeholder="비밀번호"
          value={values.password}
          onChange={updateValue}
          onBlur={updateIsFirst}
        ></input>
        <div className="errorMessage">{errors.password}</div>
      </div>
      {/* 비밀번호 확인 */}
      <div className="register__passwordConfirm registerForm__component">
        <input
          className="inputBox"
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
          placeholder="비밀번호 확인"
          value={values.passwordConfirm}
          onChange={updateValue}
          onBlur={updateIsFirst}
          onFocus={lateValidateValue}
        ></input>
        <div className="errorMessage">{errors.passwordConfirm}</div>
      </div>
      {/* 핸드폰 번호 */}
      <div className="register__phoneNumber registerForm__component">
        <input
          className="inputBox"
          type="tel"
          name="phoneNumber"
          id="phoneNumber"
          placeholder="휴대폰 번호"
          value={values.phoneNumber}
          onChange={updateValue}
          onBlur={updateIsFirst}
        ></input>
        <div className="errorMessage">{errors.phoneNumber}</div>
      </div>
      {/* 생년월일 */}
      <div className="register__birth registerForm__component">
        <div className="register__birthForm">
          {/* 년 */}
          <input
            className="register__birthYear"
            type="text"
            name="birthYear"
            id="birthYear"
            value={values.birthYear}
            onChange={updateValue}
            onBlur={updateIsFirst}
            maxLength="4"
            placeholder="생년(4자)"
          ></input>
          {/* 월 */}
          <span>
            <select
              className="register__birthMonth"
              id="birthMonth"
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
            id="birthDay"
            value={values.birthDay}
            onChange={updateValue}
            onBlur={updateIsFirst}
            maxLength="2"
            placeholder="일"
          ></input>
        </div>
        <div className="errorMessage">{errors.birth}</div>
      </div>
      {/* 계좌 은행 */}
      <div className="register__bank">
        <input
          className="inputBox"
          type="text"
          name="bank"
          id="bank"
          placeholder="은행"
          value={values.bank}
          onChange={updateValue}
          onBlur={updateIsFirst}
        ></input>
        <div className="errorMessage">{errors.bank}</div>
      </div>
      {/* 계좌 번호 */}
      <div className="register__account registerForm__component">
        <input
          className="inputBox"
          type="text"
          name="account"
          id="account"
          placeholder="계좌 번호"
          value={values.account}
          onChange={updateValue}
          onBlur={updateIsFirst}
        ></input>
        <div className="errorMessage">{errors.account}</div>
      </div>
      {/* 사업자 등록증 파일 업로드 */}
      <div className="register__businessRegistration">
        {/* type file 형태로 바꾸고 업로드 가능하게 만들기 */}
        <input
          type="text"
          id="show-upload"
          placeholder="사업자 등록증"
          className="inputBox inputBox__businessRegistration"
          value={values.businessRegistration}
          disabled="disabled"
        ></input>
        <label
          className="businessRegistration__button"
          htmlFor="real-upload"
        >
          업로드
        </label>
        <input type="file" id="real-upload" className="upload-hidden" accept=".pdf, image/*" onChange={fileUploaded} />
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
    </div>
  );
}

export default RegisterBusiness;
