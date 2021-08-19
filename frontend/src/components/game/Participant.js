import UserApi from 'api/UserApi';
import ImgApi from 'api/ImgApi';
import React, { useEffect, useState } from 'react';
import './Participant.css';

const Participant = (props) => {
  // 유저 정보 State
  const [userInfo, setUserInfo] = useState([]);
  const [imgUrl, setImgUrl] = useState(null);

  // 유저 정보 가져오기
  useEffect(() => {
    if (props.user) {
      UserApi.myprofile(
        { email: props.user.userAuth.email },
        (res) => setUserInfo(res.data),
        (err) => console.log(err)
      );
      ImgApi.getUserImg(
        { email: props.user.userAuth.email },
        (res) => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          setImgUrl(url);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }, [props]);

  // 참가자의 포지션 표시
  useEffect(() => {
    if (userInfo.guard) {
      let select = document.querySelector(`.user${props.id} #guard`);
      select.className = 'istrue';
    }
    if (userInfo.forward) {
      let select = document.querySelector(`.user${props.id} #forward`);
      select.className = 'istrue';
    }
    if (userInfo.forward) {
      let select = document.querySelector(`.user${props.id} #center`);
      select.className = 'istrue';
    }
  }, []);

  // 커서 올라가면 참가자 정보 표시
  const over = (event) => {
    const {
      target: { id },
    } = event;
    document.querySelector(`.${id}`).style.display = 'block';
  };

  // 커서 내려가면 참가자 정보 가림
  const out = (event) => {
    const {
      target: { id },
    } = event;
    document.querySelector(`.${id}`).style.display = 'none';
  };

  return (
    <div className="participant">
      <img
        id={`user${props.id}`}
        src={imgUrl ? imgUrl : '/images/symbol.png'}
        onMouseOver={over}
        onMouseOut={out}
        alt="participants"
      />
      <div className={'user' + props.id + ' userinfo'}>
        <div className="about__user">
          {imgUrl ? (
            <img src={imgUrl} alt="participants" />
          ) : (
            <img src="/images/symbol.png" alt="prticipants" />
          )}
          <div>
            <p>{userInfo.name}</p>
            <p>{userInfo.height}cm</p>
          </div>
        </div>
        <div className="about__position">
          <p id="guard" className="isfalse">
            가드
          </p>
          <p id="forward" className="isfalse">
            포워드
          </p>
          <p id="center" className="isfalse">
            센터
          </p>
        </div>
        <div className="points">
          <div className="manner">
            <p>매너 점수</p>
            <p>{userInfo.manner}</p>
          </div>
          <div className="skill">
            <p>실력 점수</p>
            <p>{userInfo.skill ? userInfo.skill : '비공개'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Participant;
