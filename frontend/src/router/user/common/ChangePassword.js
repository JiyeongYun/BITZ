import React, { useContext, useEffect, useState } from 'react';
import ChangePasswordValidation from 'components/user/common/ChangePasswordValidation.js'; // 유효성 검사 함수
import './ChangePassword.css'; // Register.css의 내용을 많이 차용함 (Form이 비슷하기 때문)
import UserApi from 'api/UserApi';
import { store } from 'store/store.js'; // store import (store)

function ChangePassword({ history }) {
  // 전역 상태 관리 (store)
  const globalState = useContext(store);
  const { isLogin, userKind } = globalState.value;

  // State ***************************************************************
  // 입력 데이터
  const [values, setValues] = useState({
    password: '',
    newPassword: '',
    newPasswordConfirm: '',
  });
  // 유효성 검사 결과
  const [errors, setErrors] = useState({
    password: true,
    newPassword: true,
    newPasswordConfirm: true,
  });
  // 최초 입력 확인
  const [isFirst, setIsFirst] = useState({
    password: true,
    newPassword: true,
    newPasswordConfirm: true,
  });
  // 값을 모두 입력했는지 검증
  const [isValidated, setIsValidated] = useState(false);

  // useEffect ***************************************************************
  // PJW - 데이터 유효성 검증
  useEffect(() => {
    setErrors({ ...ChangePasswordValidation(values, isFirst) });
  }, [values, isFirst]);
  // 데이터 유효성 검증 End

  // 전체 데이터 유효성 검사
  useEffect(() => {
    let check = true;
    Object.values(errors).forEach((value) => {
      check = check && !value;
    });
    setIsValidated(check);
  }, [errors]);
  // 전체 데이터 유효성 검사 End

  // methods ***************************************************************
  // PJW - 데이터 입력 시 값 업데이트
  const updateValue = (event) => {
    let { id, value } = event.target;
    if (id==="password") {
      setValues({ ...values, [id]: value, passwordConfirm: ""});
      setIsFirst({...isFirst, passwordConfirm: true})
    } else {
      setValues({ ...values, [id]: value});
    }
    handleInput(id, value)
  } // updateValue End

  // PJW - 에러 메시지 노출을 위해 최초 입력인지 확인
  const updateIsFirst = (event) => {
    setIsFirst({ ...isFirst, [event.target.name]: false });
  }; // updateIsFirst End

  // PJW - Focus out 시 유효성 검사
  const lateValidateValue = (event) => {
    const name = event.target.name;
    if (name === 'newPasswordConfirm') {
      setIsFirst({ ...isFirst, [name]: true });
    }
  }; // lateValidateValue End

  // PJW - 비밀번호 변경
  const onChangePassword = () => {
    const data = {
      email: isLogin,
      newPassword: values.newPassword,
      password: values.password,
    };

    if (userKind === 'player') {
      UserApi.changePassword(
        data,
        () => {
          alert('비밀번호가 변경되었습니다!');
          history.push(`/accounts/profile/${isLogin}`);
        },
        () => {
          alert('비밀번호를 확인해주세요.');
        }
      );
    } else if (userKind === 'business') {
      UserApi.changeBusPassword(
        data,
        () => {
          alert('비밀번호가 변경되었습니다!');
          history.push(`/accounts/profile/${isLogin}`);
        },
        () => {
          alert('비밀번호를 확인해주세요.');
        }
      );
    }
  }; // onChangePassword End

  } // onChangePassword End

  // input 값 입력 시 done 클래스 추가
  const handleInput = (id, value) => {
    if (value) {
      document.querySelector(`#${id}`).classList.add('done')
    } else {
      document.querySelector(`#${id}`).classList.remove('done')
    }
  }

  return(
    <div className="changePassword">
      <h4>비밀번호 변경</h4>
      <div className="changePasswordForm registerForm__center">
        {/* 구 비밀번호 */}
        <div className="changePassword__password changePasswordForm__component">
          <label>현재 비밀번호 입력</label>
          <br />
          <input className="inputBox" type="password" id="password" name="password" value={values.password} onChange={updateValue} onBlur={updateIsFirst}></input>
          <div className="errorMessage">{errors.password}</div>
        </div>
        {/* 신 비밀번호 */}
        <div className="changePassword__password changePasswordForm__component">
          <label>새 비밀번호 입력</label>
          <br />
          <input className="inputBox" type="password" id="newPassword" name="newPassword" value={values.newPassword} onChange={updateValue} onBlur={updateIsFirst}></input>
          <div className="errorMessage">{errors.newPassword}</div>
        </div>
        {/* 신 비밀번호 확인 */}
        <div className="changePassword__passwordConfirm changePasswordForm__component">
          <label>새 비밀번호 확인</label>
          <br />
          <input className="inputBox" type="password" id="newPasswordConfirm" name="newPasswordConfirm" value={values.newPasswordConfirm} onChange={updateValue} onBlur={updateIsFirst} onFocus={lateValidateValue}></input>
          <div className="errorMessage">{errors.newPasswordConfirm}</div>
        </div>

        <button
          type="sumbit"
          onClick={onChangePassword}
          className={
            isValidated
              ? 'registerForm__button register__button'
              : 'disabled registerForm__button register__button'
          }
        >
          비밀번호 변경
        </button>
      </div>
    </div>
  );
}

export default ChangePassword;