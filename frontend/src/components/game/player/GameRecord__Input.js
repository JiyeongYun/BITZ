import React, { useContext, useState } from 'react';
import './GameRecord__Input.css';
import { gameStore } from 'store/gameStore';
import { store } from 'store/store';

const GameRecord__Input = ({ game, setShowInput, team1, team2 }) => {
  const gameStoreData = useContext(gameStore);
  const { aboutGame, gameDispatch } = gameStoreData;

  const globalState = useContext(store);
  const { value } = globalState;
  // 이 컴포넌트가 어떤 게임의 입력창인지 지정
  const team1_score = game+'_team1_score'
  const team2_score = game+'_team2_score'
  const recorder = game+'_recorder'
  // States
  const [scores, setScores] = useState({
    team1_score: '',
    team2_score: '',
  })
  const [modalSwitch, setModalSwitch] = useState(true)

  // Methods
  // PJW - 변화한 값을 임시저장하는 함수
  const changeScore = (event) => {
    const { name, value } = event.target;
    setScores({ ...scores, [name]: value });
  }
  // PJW - 입력된 값을 기록하는 함수
  const recordScore = () => {
    if (window.confirm('경기 기록은 수정할 수 없습니다. 기록하시겠습니까?')) {
      gameDispatch({ type: "UPADTE_GAME_SCORE", value: {
        team1: team1_score,
        team1_score: (modalSwitch? parseInt(scores.team1_score)-aboutGame.gameData[team1_score].reduce((sum, currValue)=>(sum+currValue), 0) : parseInt(scores.team1_score)),
        team2: team2_score,
        team2_score: (modalSwitch? parseInt(scores.team2_score)-aboutGame.gameData[team2_score].reduce((sum, currValue)=>(sum+currValue), 0) : parseInt(scores.team2_score)),
        recorder: recorder,
        current_recorder: value.isLogin,
        unKnown_bugFix: aboutGame.gameData[recorder].length // 함수 1번 실행 => dispatch 2번 실행 => state 3번 변경이라는 해괴한 오류 방지
      }})
      setShowInput(false)
    }
  }
  // PJW - Modal 창 닫기
  const closeModal = () => {
    setShowInput(false)
  }
  // PJW - 입력 타입 변경 (true: 누적합 / false: 쿼터별)
  const switchRecordingType = () => {
    setModalSwitch(!modalSwitch)
  }
  
  return (
    <div className="modal">
      <div className="modal__overlay"></div> {/* 회색 배경 */}
      <div className="modal__content"> {/* 모달 내부 */}
        <div className="modal__switch" onClick={switchRecordingType}>
          <div className={modalSwitch? "modal__switch_current" : "modal__switch_current modal__switch_active"}></div>
          <div className={modalSwitch? "modal__switch_prefix modal__switch_stateActivated" : "modal__switch_prefix"}>누적합</div>
          <div className={modalSwitch? "modal__switch_each" : "modal__switch_each modal__switch_stateActivated"}>쿼터별</div>
        </div>
        <div className="modal__Scores">
          <input className="GameRecord__Input_Score" name="team1_score" value={scores.team1_score} onChange={changeScore} placeholder={`${team1}팀`} />
          <input className="GameRecord__Input_Score" name="team2_score" value={scores.team2_score} onChange={changeScore} placeholder={`${team2}팀`} />
        </div>
        <button className="GameRecord__Input_Submit" onClick={recordScore}>기록</button>
        <button className="GameRecord__closeBtn" onClick={closeModal}>X</button>
      </div>
    </div>
  );
};

export default GameRecord__Input;
