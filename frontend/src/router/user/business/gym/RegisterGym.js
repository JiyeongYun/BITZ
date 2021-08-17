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
    const { target : { parentElement : {childNodes} }} = event;

    if (childNodes[0].style.display === "block" ) {
      childNodes[0].style.display = "none"
      changeFacilityState(event.target.alt, false)
    } else {
      childNodes[0].style.display = "block"
      changeFacilityState(event.target.alt, true)
    }
  }

  console.log(water, shower, scoreboard, parking, basketball, airconditioner)

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
    if (value) {
      document.getElementsByName(name)[0].classList.add('done')
    } else {
      document.getElementsByName(name)[0].classList.remove('done')
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
            <input type="text" name="name" onChange={onChange} placeholder="체육관명을 입력해주세요." />
          </div>
          <div className="gymIntro__box">
            <textarea name="intro" onChange={onChange} placeholder="체육관을 소개해주세요." />
          </div>
          <div className="gymNotice__box">
            <textarea name="notice" onChange={onChange} placeholder="주의사항을 알려주세요." />
          </div>
          <div className="courtsize__box">
            <div>
              <div>
                <input type="number" name="courtLength" onChange={onChange} placeholder="코트 가로 길이" />
                <span>M</span>
              </div>
              <span>X</span>
              <div>
                <input type="number" name="courtWidth" onChange={onChange} placeholder="코트 세로 길이"/>
                <span>M</span>
              </div>
            </div>
          </div>
          <div className="gymaddress__box">
            <div className="gymaddress">
              <div>
                <select name="sido" onChange={onChange} className="gym__sido done">
                  {location.sido.map((t,idx) => {
                    return (
                      <option key={idx}>{t}</option>
                    )
                  })}
                </select>
              </div>
              <div>
                <select name="gugun" onChange={onChange} className="gym__gugun">
                  {location.gugun[sido] ? location.gugun[sido].map((gu, idx) => {
                    return <option key={idx+100}>{gu}</option>
                  }) : <option>상세 지역</option>}
                </select>
              </div>
              <div>
                <input type="text" name="address" onChange={onChange} placeholder="상세 주소" />
              </div>
            </div>
          </div>
          <div className="gymfacilities__box">
            <h4>제공되는 편의 시설을 선택해주세요.</h4>
            <div className="facilities">
              <div className="facility">
                <div className="img_box">
                  <div className="img_box_checked">
                    <img src="/images/check.png" alt="check"/>
                  </div>
                  <img src="/images/water.png" alt="water" onClick={onClickFacilities} />
                </div>
                <p>정수기</p>
              </div>
              <div className="facility">
                <div className="img_box">
                  <div className="img_box_checked">
                    <img src="/images/check.png" alt="check"/>
                  </div>
                  <img src="/images/shower.png" alt="shower" onClick={onClickFacilities} />
                </div>
                <p>샤워실</p>
              </div>
              <div className="facility">
                <div className="img_box">
                  <div className="img_box_checked">
                    <img src="/images/check.png" alt="check"/>
                  </div>
                 <img src="/images/scoreboard.png" alt="scoreboard" onClick={onClickFacilities} />
                </div>
                <p>점수판 & 휘슬</p>
              </div>
              <div className="facility">
              <div className="img_box">
                <div className="img_box_checked">
                  <img src="/images/check.png" alt="check"/>
                </div>
                <img src="/images/parking.png" alt="parking" onClick={onClickFacilities} />
              </div>
                <p>주차장</p>
              </div>
              <div className="facility">
                <div className="img_box">
                  <div className="img_box_checked">
                    <img src="/images/check.png" alt="check"/>
                  </div>
                  <img src="/images/basketball.png" alt="basketball" onClick={onClickFacilities} />
                </div>
                <p>농구공</p>
              </div>
              <div className="facility">
                <div className="img_box">
                  <div className="img_box_checked">
                    <img src="/images/check.png" alt="check"/>
                  </div>
                  <img src="/images/airconditioner.png" alt="airconditioner" onClick={onClickFacilities} />
                </div>
                <p>에어컨</p>
              </div>
            </div>
          </div>
          <div className="gympicture__box">
            <h4>체육관 사진을 등록해주세요.</h4>
            <p>현재는 한 개의 사진만 등록 가능해요. 서둘러 개선할게요! ೕ(•̀ᴗ•́)</p>
            <input type="file" accept="image/*" onChange={onAddGymPhoto} />
          </div>
          <button className="registergym__btn" onClick={registerGym}>체육관 등록</button>
        </div>
      </div>
    </div>
  );
};

export default RegisterGym;
