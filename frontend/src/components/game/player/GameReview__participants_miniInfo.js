import React from "react";

function GameReview__Participants_miniInfo ({ idx, member, reviewType }) {
  return (
    <div className={reviewType+'user' + idx + ' userinfo'}>
      <div className="about__user">
        <img src={"/images/"+member.id+".png"} />
        <div>
          <p>{member.name}</p>
          <p>{member.height}cm</p>
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
          <p>{member.manner}</p>
        </div>
        <div className="skill">
          <p>실력 점수</p>
          <p>{member.skill ? member.skill : '비공개'}</p>
        </div>
      </div>
    </div>
  )
}

export default GameReview__Participants_miniInfo