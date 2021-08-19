import React, { useState, useContext } from 'react';
import './FindPassword.css';
import WriteEmail from 'components/user/WriteEmail';
import SendPassword from 'components/user/SendPassword';
import UserApi from 'api/UserApi';
import { store } from 'store/store.js';

function FindPassword() {
  // 전역 상태 관리 (store)
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const { userKind } = globalState.value;

  const [email, setEmail] = useState('');
  const [isSend, setIsSend] = useState(false);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'userKind') {
      // userKind 전역 상태 관리 (store)
      dispatch({ type: 'SELECT_USER_KIND', value });
    }
  };

  if (isSend) {
    return (
      <div className="findpw">
        <SendPassword email={email} />
      </div>
    );
  } else {
    return (
      <div className="findpw">
        <u id="findPasswordTitle">비밀번호 찾기</u>
        <div className="userKind">
          <label
            className={
              userKind === 'player' ? 'userKindRadio selected' : 'userKindRadio unselected'
            }
          >
            <input type="radio" value="player" name="userKind" onClick={onChange} />
            <span>플레이어</span>
          </label>
          <label
            className={
              userKind === 'business' ? 'userKindRadio selected' : 'userKindRadio unselected'
            }
          >
            <input type="radio" value="business" name="userKind" onClick={onChange} />
            <span>비즈니스</span>
          </label>
        </div>
        
        <WriteEmail
          setEmail={(e) => setEmail(e)}
          setIsSend={() => {
            const data = { email: email };
            setIsSend(true);
            if (userKind === 'player') {
              UserApi.findPwd(
                data,
                () => {
                  alert('메일이 전송되었습니다!');
                },
                () => {
                  setIsSend(false);
                  alert('이메일을 확인해주세요!');
                }
              );
            } else if (userKind === 'business') {
              UserApi.findBusPwd(
                data,
                () => {
                  alert('메일이 전송되었습니다!');
                },
                () => {
                  setIsSend(false);
                  alert('이메일을 확인해주세요!');
                }
              );
            }
          }}
        />
      </div>
    );
  }
}

export default FindPassword;
