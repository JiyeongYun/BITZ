import React, { useState } from 'react';
import './GameRecord__Input.css';

const GameRecord__Input = ({ game, gameData, setGameData, setShowInput, team1, team2 }) => {
  // 이 컴포넌트가 어떤 게임의 입력창인지 지정
  const team1_score = game+'_team1_score'
  const team2_score = game+'_team2_score'
  const recorder = game+'_recorder'
  // States
  const [scores, setScores] = useState({
    team1_score: '',
    team2_score: '',
  })

  // Methods
  // PJW - 변화한 값을 임시저장하는 함수
  const changeScore = (event) => {
    const { name, value } = event.target;
    setScores({ ...scores, [name]: value });
  }
  // PJW - 입력된 값을 기록하는 함수
  const recordScore = () => {
    if (window.confirm('경기 기록은 수정할 수 없습니다. 기록하시겠습니까?')) {
      const updated_team1_score = gameData[team1_score]
      updated_team1_score.push(parseInt(scores.team1_score))
      const updated_team2_score = gameData[team2_score]
      updated_team2_score.push(parseInt(scores.team2_score))
      const updated_recorder = gameData[recorder]
      updated_recorder.push('TEST')
      setGameData({
        ...gameData,
        [team1_score]: updated_team1_score,
        [team2_score]: updated_team2_score,
        [recorder]: updated_recorder
      })
      setShowInput(false)
    }
  }
  // PJW - Modal 창 닫기
  const closeModal = () => {
    setShowInput(false)
  }
  
  return (
    <div className="modal">
      <div className="modal__overlay"></div> {/* 배경 */}
      <div className="modal__content">
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
