import GymApi from 'api/GymApi';
import React, { useContext, useState } from 'react';
import './RegisterGym.css';
import { useHistory  } from 'react-router-dom';
import { store } from 'store/store.js';
import { locations } from 'store/location.js'
import ImgApi from 'api/ImgApi';

//  비즈니스 유저가 체육관 등록하는 페이지
const RegisterGym = () => {
  const history = useHistory();
  const globalState = useContext(store);
  const { value } = globalState;
  
  // 지역 정보
  const location = useContext(locations)
  
  // 체육관 등록 시 필요 데이터 정의
  const [gymName, setGymName] = useState(null)
  const [intro, setIntro] = useState(null)
  const [notice, setNotice] = useState(null)
  const [courtLength, setcourtLength] = useState(28)
  const [courtWidth, setCourtWidth] = useState(15)
  const [address, setAddress] = useState(null)
  const [water, setWater] = useState(false)
  const [shower, setShower] = useState(false)
  const [scoreboard, setScoreboard] = useState(false)
  const [parking, setParking] = useState(false)
  const [basketball, setBasketball] = useState(false)
  const [airconditioner, setAirconditioner] = useState(false)
  const [pictures, setPictures] = useState([])
  const [sido, setSido] = useState('서울')
  const [gugun, setGugun] = useState(null)
  
  const onAddGymPhoto = (event) => {
    setPictures(event.target.files[0]);
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
    } else if (name === 'intro') {
      setIntro(value);
    } else if (name === 'notice') {
      setNotice(value);
    } else if (name === 'courtLength') {
      setcourtLength(value);
    } else if (name === 'courtWidth') {
      setCourtWidth(value);
    } else if (name === "address") {
      setAddress(value)
    } else if (name === "sido") {
      setSido(value)
    } else if (name === "gugun") {
      setGugun(value)
    }
  };

  // '체육관 등록' 버튼을 누르면 체육관 정보를 백엔드로 보내는 함수
  const registerGym = () => {
    
    const formData = {
      address,
      airconditional : airconditioner,
      businessEmail : value.isLogin,
      basketball,
      courtLength,
      courtWidth,
      gugun,
      name: gymName,
      parking,
      scoreboard,
      sido,
      shower,
      water,
      intro,
      notice,
    }

    const imgData = new FormData()
    imgData.append('images', pictures, pictures.name)
    
    GymApi.requestGymRegister(
      formData,
      res => {
        imgData.append("gymId", res.data)
        ImgApi.uploadGymImg(
          imgData,
          res => {
            alert("체육관이 등록되었습니다!")
            history.push("/")
          },
          err => {
            console.log(err)
          }
        )
      },
      err => {
        console.log('에러발생', err)
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
            <h4>체육관 소개</h4>
            <textarea name="intro" onChange={onChange} />
          </div>
          <div className="gymNotice__box">
            <h4>주의 사항</h4>
            <textarea name="notice" onChange={onChange} />
          </div>
          <div className="courtsize__box">
            <h4>코트 규격</h4>
            <p>정규 코트 : 28m X 15m</p>
            <div>
              <input type="number" name="courtLength" onChange={onChange} />m<span>X</span>
              <input type="number" name="courtWidth" onChange={onChange} />m
            </div>
          </div>
          <div className="gymaddress__box">
            <h4>위치</h4>
            <div className="gymaddress">
              <div>
                <p>지역</p>
                <select name="sido" onChange={onChange} className="gym__sido">
                  {location.sido.map((t,idx) => {
                    return (
                      <option key={idx}>{t}</option>
                    )
                  })}
                </select>
              </div>
              <div>
                <p>상세 지역</p>
                <select name="gugun" onChange={onChange} className="gym__gugun">
                  {location.gugun[sido] ? location.gugun[sido].map((gu, idx) => {
                    return <option key={idx+100}>{gu}</option>
                  }) : <option>상세 지역</option>}
                </select>
              </div>
              <div>
                <p>상세 주소</p>
                <input type="text" name="address" onChange={onChange} />
              </div>
            </div>
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
            <input type="file" accept="image/*" onChange={onAddGymPhoto} />
          </div>
          <button className="registergym__btn" onClick={registerGym}>체육관 등록</button>
        </div>
      </div>
    </div>
  );
};

export default RegisterGym;
