import GameApi from "api/GameApi";
import React, { useContext, useEffect, useState } from "react"
import { gameStore } from "store/gameStore";
import { store } from "store/store";
import "./GameReview.css"
import GameReviewParticipants from "./GameReview__Participants";

const GameReview = ({ changeReviewState }) => {
  const gameStoreData = useContext(gameStore);
  const { aboutGame } = gameStoreData;
  const globalState = useContext(store);
  const { value } = globalState;

  // State
  // const [tempScore, setTempScore] = useState({
  //   mvp: "",
  //   manner: "",
  //   goodPeople: [],
  //   badPeople: [],
  //   facility: 0
  // })
  const [reviewScore, setReviewScore] = useState({
    mvp: "",
    manner: "",
    goodPeople: [],
    badPeople: [],
    facility: 0
  })

  // Methods
  // PJW - Modal 창 닫기
  const closeModal = () => {
    changeReviewState();
  }
  // PJW - 리뷰 등록 (미완성)
  const registerReview = () => {
    const data = {
      "badPeople": reviewScore.badPeople.map(idx=>aboutGame.gameParticipantList[idx].userAuth.email),
      "email": value.isLogin,
      "gameId": aboutGame.gameInfo.id,
      "goodPeople": reviewScore.goodPeople.map(idx=>aboutGame.gameParticipantList[idx].userAuth.email),
      "gymId": aboutGame.gameInfo.gym.id,
      "mvp": aboutGame.gameParticipantList[parseInt(reviewScore.mvp)].userAuth.email,
      "rate": parseInt(reviewScore.facility)
    }
    
    GameApi.ApplyReview(data,
      (response)=>{
        console.log(response)
        alert('소중한 리뷰 감사합니다!')
        changeReviewState();
      },
      (error)=>{
        alert('리뷰를 등록할 수 없습니다.')
        console.log(error)
      }
    )
  }
  // PJW - 농구공 점수 임시 등록 (MouseOver 시)
  // const Basketball_scoring = (event) => {
  //   if (!reviewScore.facility) {
  //     const { name } = event.target;
  //     const value = event.target.getAttribute('value')
  //     setTempScore({...tempScore, [name]: value})
  //   }
  // }
  // PJW - 농구공 점수 복구 (MouseOut 시)
  // const Basketball_scoring_restore = () => {
  //   setTempScore({...reviewScore})
  // }
  // PJW - 농구공 점수 확정 (MouseClick 시)
  // const Basketball_scoring_select = (event) => {
  //   const { name } = event.target;
  //   const value = event.target.getAttribute('value')
  //   setReviewScore({...reviewScore, [name]: value})
  //   setTempScore({...reviewScore, [name]: value})
  // }

  // PJW - MVP, Manner에 선택된 사람 표시
  useEffect(()=>{
    if (reviewScore.mvp) {
      document.querySelector(`.mvp${reviewScore.mvp} .Participants__selected`).style.display = 'flex';
    }
    if (reviewScore.manner.length) {
      document.querySelector(`.manner${reviewScore.manner} .Participants__selected`).style.display = 'flex';
    }
  },[reviewScore])

  return (
    <div className="modal">
      
      <div className="modal__overlay"></div> {/* 회색 배경 */}
      <div className="modal__content gameReview"> {/* 모달 내부 */}
        <div>
          <h4>기록하기</h4>
        </div>
        <div className="gameReview__input">
          {/* MVP */}
          <div className="gameReview__MVP">
            <h2>최고의 MVP를 뽑아주세요!</h2>
            <span>* 한 명만 선택하실 수 있습니다.</span>
            <div>
              <GameReviewParticipants reviewType="mvp" setReviewScore={setReviewScore} reviewScore={reviewScore} mode='mvp' />
            </div>
          </div>
          {/* Manner */}
          <div className="gameReview__manner">
            <h2>같이 농구했던 사람들은 어떠셨나요?</h2>
            <span>* 복수선택 가능</span>
            <div>
              <GameReviewParticipants reviewType="manner" setReviewScore={setReviewScore} reviewScore={reviewScore} mode='manner' />
            </div>
          </div>
          {/* Gym */}
          {/* <div className="gameReview__gym">
            <h2>체육관은 만족스러우셨나요?</h2>
            <span>* 익명으로 제공되니, 솔직한 리뷰 부탁드립니다.</span>
            <div>
              <div className="gameReview__Facility">
                <div className="gameReview__gym_itemName">
                  시설
                </div>
                <div onMouseOut={Basketball_scoring_restore}>
                  {tempScore.facility>=1?(
                    <img src={'/images/basketball_purple.png'} alt="facility_score" className="gameReview__basketballScore" name="facility" value={1} onMouseOver={Basketball_scoring} onClick={Basketball_scoring_select} />
                    ):(
                    <img src={'/images/basketball_black.png'} alt="facility_score" className="gameReview__basketballScore" name="facility" value={1} onMouseOver={Basketball_scoring} onClick={Basketball_scoring_select} />
                  )}
                  {tempScore.facility>=2?(
                    <img src={'/images/basketball_purple.png'} alt="facility_score" className="gameReview__basketballScore" name="facility" value={2} onMouseOver={Basketball_scoring} onClick={Basketball_scoring_select} />
                    ):(
                    <img src={'/images/basketball_black.png'} alt="facility_score" className="gameReview__basketballScore" name="facility" value={2} onMouseOver={Basketball_scoring} onClick={Basketball_scoring_select} />
                  )}
                  {tempScore.facility>=3?(
                    <img src={'/images/basketball_purple.png'} alt="facility_score" className="gameReview__basketballScore" name="facility" value={3} onMouseOver={Basketball_scoring} onClick={Basketball_scoring_select} />
                    ):(
                    <img src={'/images/basketball_black.png'} alt="facility_score" className="gameReview__basketballScore" name="facility" value={3} onMouseOver={Basketball_scoring} onClick={Basketball_scoring_select} />
                  )}
                  {tempScore.facility>=4?(
                    <img src={'/images/basketball_purple.png'} alt="facility_score" className="gameReview__basketballScore" name="facility" value={4} onMouseOver={Basketball_scoring} onClick={Basketball_scoring_select} />
                    ):(
                    <img src={'/images/basketball_black.png'} alt="facility_score" className="gameReview__basketballScore" name="facility" value={4} onMouseOver={Basketball_scoring} onClick={Basketball_scoring_select} />
                  )}
                  {tempScore.facility>=5?(
                    <img src={'/images/basketball_purple.png'} alt="facility_score" className="gameReview__basketballScore" name="facility" value={5} onMouseOver={Basketball_scoring} onClick={Basketball_scoring_select} />
                    ):(
                    <img src={'/images/basketball_black.png'} alt="facility_score" className="gameReview__basketballScore" name="facility" value={5} onMouseOver={Basketball_scoring} onClick={Basketball_scoring_select} />
                  )}
                </div>
              </div>
            </div>
          </div> */}
          {/* Buttons */}
          <button className="GameRecord__Input_Submit" onClick={registerReview}>리뷰 등록</button>
          <button className="GameRecord__closeBtn" onClick={closeModal}>X</button>
        </div>
      </div>
    </div>
  );
};

export default GameReview;
