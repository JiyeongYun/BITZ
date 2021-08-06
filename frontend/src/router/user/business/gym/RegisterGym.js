import GymApi from 'api/GymApi';
import React, { useState } from 'react';
import './RegisterGym.css';
import { useHistory  } from 'react-router-dom';

//  비즈니스 유저가 체육관 등록하는 페이지
const RegisterGym = () => {
  const history = useHistory();
  
  // 체육관 등록 시 필요 데이터 정의
  const [gymName, setGymName] = useState(null)
  const [desc, setDesc] = useState(null)
  const [courtLenth, setCourtLenth] = useState(28)
  const [courtWidth, setCourtWidth] = useState(15)
  const [address, setAddress] = useState(null)
  const [water, setWater] = useState(false)
  const [shower, setShower] = useState(false)
  const [scoreboard, setScoreboard] = useState(false)
  const [parking, setParking] = useState(false)
  const [basketball, setBasketball] = useState(false)
  const [airconditioner, setAirconditioner] = useState(false)
  const [pictures, setPictures] = useState([])
  
  const onAddGymPhoto = (event) => {
    const newPictures = pictures;
    setPictures(newPictures.push(event.target.files[0]));
  };

  // 체육관 시설 클릭 시 css를 변경해주는 함수
  const onClickFacilities = (event) => {
    const { target : { parentElement : { parentElement : { classList : { length }}}} } = event;
    const { target : { parentElement : { parentElement }} } = event;

    if (length === 2) {
      parentElement.className = "facility"
      changeFacilityState(event.target.alt, false)
    } else {
      parentElement.className = "facility clicked"
      changeFacilityState(event.target.alt, true)
    }
  }

  // 체육관 시설 클릭 시 State를 변경해주는 함수
  const changeFacilityState = (target, value) => {
    if (target === "water") {
      setWater(value)
    } else if (target === "shower") {
      setShower(value)
    } else if (target === "scoreboard") {
      setScoreboard(value)
    } else if (target === "parking") {
      setParking(value)
    } else if (target === "basketball") {
      setBasketball(value)
    } else if (target === "airconditioner") {
      setAirconditioner(value)
    }
  }
  
  // 체육관 정보를 입력하면 State 값을 입력값으로 바꿔준다
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === 'name') {
      setGymName(value);
    } else if (name === 'desc') {
      setDesc(value);
    } else if (name === 'courtLenth') {
      setCourtLenth(value);
    } else if (name === 'courtWidth') {
      setCourtWidth(value);
    } else if (name === "address") {
      setAddress(value)
    }
  };

  // '체육관 등록' 버튼을 누르면 체육관 정보를 백엔드로 보내는 함수
  const registerGym = () => {
    const formData = new FormData();
    formData.append('address', address);
    formData.append('airconditional', airconditioner);
    formData.append('basketball', basketball);
    formData.append('courtLenth', courtLenth);
    formData.append('courtWidth', courtWidth);
    formData.append('gugun', "마포구");
    formData.append('name', gymName);
    formData.append('desc', desc);
    formData.append('parking', parking);
    formData.append('scoreboard', scoreboard);
    formData.append('shower', shower);
    formData.append('sido', "서울시");
    formData.append('water', water);
    
    GymApi.requestGymRegister(
      formData,
      {
        'content-type': 'multipart/form-data',
      }, 
      res => {
        console.log(res)
        alert("체육관이 등록되었습니다!")
        history.push("/")
      },
      err => {
        console.log(err)
      }
    );    
  }

  return (
    <div className="registerGym__div">
      <div className="gym__container">
        <h1>체육관 등록</h1>
        <div className="registerGymForm__div">
          <div className="gymName__box">
            <h4>체육관 이름</h4>
            <p>코트가 여러 개라면 코트 별로 등록해주세요.</p>
            <input type="text" name="name" onChange={onChange} />
          </div>
          <div className="gymIntro__box">
            <h4>체육관 소개 및 유의 사항</h4>
            <textarea name="desc" onChange={onChange} />
          </div>
          <div className="courtsize__box">
            <h4>코트 규격</h4>
            <p>정규 코트 : 28m X 15m</p>
            <input type="number" name="courtLenth" onChange={onChange} />m<span>X</span>
            <input type="number" name="courtWidth" onChange={onChange} />m
          </div>
          <div className="gymaddress__box">
            <h4>위치</h4>
            <input type="text" name="address" onChange={onChange} />
            {/* <button onClick={onSearchAddress}>주소 검색</button> */}
          </div>
          <div className="gymfacilities__box">
            <h4>편의 시설</h4>
            <div className="facilities">
              <div className="facility">
                <div className="img_box">
                  <img src="/images/water.png" alt="water" onClick={onClickFacilities} />
                </div>
                <p>정수기</p>
              </div>
              <div className="facility">
                <div className="img_box">
                  <img src="/images/shower.png" alt="shower" onClick={onClickFacilities} />
                </div>
                <p>샤워실</p>
              </div>
              <div className="facility">
                <div className="img_box">
                 <img src="/images/scoreboard.png" alt="scoreboard" onClick={onClickFacilities} />
                </div>
                <p>점수판 & 휘슬</p>
              </div>
              <div className="facility">
              <div className="img_box">
                <img src="/images/parking.png" alt="parking" onClick={onClickFacilities} />
              </div>
                <p>주차장</p>
              </div>
              <div className="facility">
                <div className="img_box">
                  <img src="/images/basketball.png" alt="basketball" onClick={onClickFacilities} />
                </div>
                <p>농구공</p>
              </div>
              <div className="facility">
                <div className="img_box">
                  <img src="/images/airconditioner.png" alt="airconditioner" onClick={onClickFacilities} />
                </div>
                <p>에어컨</p>
              </div>
            </div>
          </div>
          <div className="gympicture__box">
            <h4>체육관 사진</h4>
            <div className="gympictures">
              <div className="gympicture" >
                <label
                  className="gympictures__button"
                  htmlFor="real-upload"
                >
                  <p>+</p>
                </label>
                <input type="file" id="real-upload" className="upload-hidden" accept="image/*" onChange={onAddGymPhoto} />
              </div>
            </div>
          </div>
          <button className="registergym__btn" onClick={registerGym}>체육관 등록</button>
        </div>
      </div>
    </div>
  );
};

export default RegisterGym;
