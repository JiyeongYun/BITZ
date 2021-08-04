import React, { useState, useRef, useEffect } from 'react';
import './MyInfo.css';
import Location from '../Location';

const MyInfo = ({ userObj }) => {
  // 내 정보를 보여주는 컴포넌트 (신장, 포지션, 선호지역 )
  const [height, setHeight] = useState('');
  const [isClickPos, setIsClickPos] = useState(false)
  const [locationUpdate, setLocationUpdate] = useState(true)

  // height 수정 하기 위한 변수
  const heightRef = useRef(null)
  const selectedPosition = ['guard'];

  const onSubmit = (event) => {
    event.preventDefault();

    const {
      target: { name },
    } = event;
    if (name === 'heightForm') {
      // 신장 수정 후 submit
      heightRef.current.disabled = !heightRef.current.disabled
    }
    if (name === 'positionForm') {
      setIsClickPos(!isClickPos)
      // 포지션 수정 후 submit
      // selectedPosition.map((object) => {
      //   alert(object);
      // });
    }
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === 'height') {
      // 신장 input 변화 시
      setHeight(value);
    }
    if (name === 'position') {
      // 포지션 check 변화 시
      if (event.target.checked) {
        selectedPosition.push(value);
      } else {
        const idx = selectedPosition.indexOf(value);
        selectedPosition.splice(idx, idx + 1);
      }
    }
  };

  const addPosition = (e) => {
    if (selectedPosition.includes(e.target.id)) {
      const idx = selectedPosition.indexOf(e.target.id)
      selectedPosition.splice(idx, 1)
    } else {
      selectedPosition.push(e.target.id)
    }
    checked(e)
  }

  const checked = (t) => {
    if (t.target.className) {
      t.target.className = ""
    } else {
      t.target.className ="checked"
    }
  }

  return (
    <div className="MyInfo">
      <h2>내 정보</h2>
      <div className="height">
        <p>신장</p>
        <form className="heightForm" onSubmit={onSubmit} name="heightForm">
          <input ref={heightRef} type="text" name="height" disabled onChange={onChange} /><span>cm</span><br/>
          <button className="btn__update">수정</button>
        </form>
      </div>
      <div className="position">
        <p>포지션</p>
        <form className="positionForm" onSubmit={onSubmit} name="positionForm">
          <input
            type="checkbox"
            name="position"
            value="foward"
            className="position__check"
          />
          <span id="guard" className={isClickPos ? 'checked' : 'checked noclick'} onClick={addPosition}>가드</span>
          <input
            type="checkbox"
            name="position"
            value="center"
            className="position__check"
          />
          <span id="forward" className={isClickPos ? null : 'noclick'} onClick={addPosition}>포워드</span>
          <input
            type="checkbox"
            name="position"
            value="guard"
            className="position__check"
          />
          <span id="center" className={isClickPos ? null : 'noclick'} onClick={addPosition}>센터</span><br/>
          <button className="btn__update">수정</button>
        </form>
      </div>
      <div className="location">
        <p>선호지역</p>
        <div className="location__box">
          <Location locationUpdate={locationUpdate} />
          <Location locationUpdate={locationUpdate} />
          <Location locationUpdate={locationUpdate} />
        </div>
        <button className="btn__update" onClick={() => {
          setLocationUpdate(!locationUpdate)
        }}>수정</button>
      </div>
      <button className="save__btn">저장</button>
    </div>
  );
};

export default MyInfo;
