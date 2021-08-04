import React, { useEffect } from 'react'
import './Participant.css'

const Participant = (props) => {
  
  // 참가자의 포지션 표시
  useEffect(() => {
    const position = props.user.position
    position.forEach(pos => {
      let select = document.querySelector(`.user${props.idx} #${pos}`)
      select.className = "istrue"
    })
  })

  // 커서 올라가면 참가자 정보 표시
  const over = (event) => {
    const {
      target: { id },
    } = event;
    document.querySelector(`.user${id}`).style.display = 'block';
  };
  
  // 커서 내려가면 참가자 정보 가림
  const out = (event) => {
    const {
      target: { id },
    } = event;
    document.querySelector(`.user${id}`).style.display = 'none';
  };

  return (
    <div className="participant">
      <img
        id={props.idx}
        src={"/images/"+props.user.id+".png"}
        onMouseOver={over}
        onMouseOut={out}
        alt="participants"
      />
      <div className={'user' + props.idx + ' userinfo'}>
        <div className="about__user">
          <img src={"/images/"+props.user.id+".png"} alt="prticipants" />
          <div>
            <p>{props.user.name}</p>
            <p>{props.user.height}cm</p>
          </div>
        </div>
        <div className="about__position">
          <p id="guard" className="isfalse">가드</p>
          <p id="forward" className="isfalse">포워드</p>
          <p id="center" className="isfalse">센터</p>
        </div>
        <div className="points">
          <div className="manner">
            <p>매너 점수</p>
            <p>{props.user.manner}</p>
          </div>
          <div className="skill">
            <p>실력 점수</p>
            <p>{props.user.skill ? props.user.skill : '비공개'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Participant