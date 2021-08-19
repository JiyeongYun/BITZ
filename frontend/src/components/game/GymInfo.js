import React, { useContext, useEffect, useState } from "react";
import "./GymInfo.css";
import { gameStore } from "store/gameStore";
import { useHistory, useRouteMatch } from "react-router-dom";
import { store } from "store/store";
import GameApi from "api/GameApi";
import UserApi from "api/UserApi";

const GymInfo = ({ isBusiness }) => {
  const gameStoreData = useContext(gameStore);
  const { aboutGame } = gameStoreData;
  const {
    parking,
    shower,
    airconditional,
    water,
    basketball,
    scoreboard,
    intro,
    notice,
    businessAuth,
  } = aboutGame.gameInfo.gym;
  const history = useHistory();
  const match = useRouteMatch();
  const globalState = useContext(store);
  const { value } = globalState;
  const { isLogin } = value;
  const { params } = match;

  // 체육관 소유자 정보 가져오기
  const [busInfo, setBusInfo] = useState([]);
  useEffect(() => {
    UserApi.BusMyProfile(
      { email: businessAuth.email },
      (res) => setBusInfo(res.data),
      (err) => console.log(err)
    );
  }, [aboutGame]);

  // 픽업게임 상세보기에서 체육관 정보를 보여주는 컴포넌트
  useEffect(() => {
    if (water) {
      document.querySelector("#water").style.display = "block";
    } else {
      document.querySelector("#water").style.display = "none";
    }
    if (shower) {
      document.querySelector("#shower").style.display = "block";
    } else {
      document.querySelector("#shower").style.display = "none";
    }
    if (scoreboard) {
      document.querySelector("#scoreboard").style.display = "block";
    } else {
      document.querySelector("#scoreboard").style.display = "none";
    }
    if (parking) {
      document.querySelector("#parking").style.display = "block";
    } else {
      document.querySelector("#parking").style.display = "none";
    }
    if (basketball) {
      document.querySelector("#basketball").style.display = "block";
    } else {
      document.querySelector("#basketball").style.display = "none";
    }
    if (airconditional) {
      document.querySelector("#airconditioner").style.display = "block";
    } else {
      document.querySelector("#airconditioner").style.display = "none";
    }
  }, [aboutGame]);

  // PJW - 예약 완료 여부 확인
  const [isFull, setIsFull] = useState(false);
  useEffect(() => {
    setIsFull(aboutGame.gameParticipantList.length === aboutGame.gameInfo.maxPeople);
  }, [aboutGame.gameParticipantList, aboutGame.gameInfo]);

  // PJW - 예약하기 버튼 클릭
  const reserveGame = () => {
    GameApi.reserveGame(
      {
        userEmail: isLogin,
        gameId: params.gameId,
      },
      () => {
        history.push(`/detail/${aboutGame.gameInfo.id}/reservation`);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  // PJW - 로그인 없이 예약하기 버튼을 눌렀음
  const needLogin = () => {
    alert("예약을 하려면 로그인을 해주세요!");
  };

  // 계좌 복사
  const copyAccount = () => {
    const textarea = document.createElement("textarea");
    textarea.value = busInfo.account;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("계좌가 복사되었습니다.");
  };

  return (
    <div className="gymInfo">
      <p>
        저희 경기장의 코트 규격은, <span>28m x 15m</span> 입니다.
      </p> <br/>
      <p>편의시설은,</p>
      <div className="facilities__container">
        <div className="waterbox">
          <div className="img_box">
            <div className="img_box_checked" id="water">
              <img src="/images/check.png" alt="check" />
            </div>
            <img src="/images/water.png" alt="water" />
          </div>
          <p>정수기</p>
        </div>
        <div className="showerbox">
          <div className="img_box">
            <div className="img_box_checked" id="shower">
              <img src="/images/check.png" alt="check" />
            </div>
            <img src="/images/shower.png" alt="shower" />
          </div>
          <p>샤워실</p>
        </div>
        <div className="scoreboardbox">
          <div className="img_box">
            <div className="img_box_checked" id="scoreboard">
              <img src="/images/check.png" alt="check" />
            </div>
            <img src="/images/scoreboard.png" alt="scoreboard" />
          </div>
          <p>점수판 & 휘슬</p>
        </div>
        <div className="parkingbox">
          <div className="img_box">
            <div className="img_box_checked" id="parking">
              <img src="/images/check.png" alt="check" />
            </div>
            <img src="/images/parking.png" alt="parking" />
          </div>
          <p>주차장</p>
        </div>
        <div className="basketballbox">
          <div className="img_box">
            <div className="img_box_checked" id="basketball">
              <img src="/images/check.png" alt="check" />
            </div>
            <img src="/images/basketball.png" alt="basketball" />
          </div>
          <p>농구공</p>
        </div>
        <div className="airconditionerbox">
          <div className="img_box">
            <div className="img_box_checked" id="airconditioner">
              <img src="/images/check.png" alt="check" />
            </div>
            <img src="/images/airconditioner.png" alt="airconditioner" />
          </div>
          <p>에어컨 & 난방</p>
        </div>
      </div>
      <div className="gym__footer">
        <div className="left">
          
            <h4 className="intro">체육관 소개</h4>
            <p>{intro}</p>
          
            <h4 className="notice">주의사항</h4>
            <p>{notice}</p>
          
        </div>
        <div className="right">
          <h4>관리자 정보</h4>
          <p>
            {busInfo.name} {busInfo.phone}
          </p>
          <p>
            {busInfo.bank} {busInfo.account} | <button onClick={copyAccount}>계좌복사</button>
          </p>
        </div>
      </div>
      {!isBusiness ? (
        <div>
          {isFull ? (
            <button className="reservation__btn">모집완료</button>
          ) : isLogin ? (
            <button className="reservation__btn" onClick={reserveGame}>
              예약하기
            </button>
          ) : (
            <button className="reservation__btn" onClick={needLogin}>
              예약하기
            </button>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default GymInfo;
