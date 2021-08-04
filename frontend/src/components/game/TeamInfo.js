import React, { useEffect, useContext } from 'react';
import './TeamInfo.css';
import { gameStore } from 'store/gameStore';

const TeamInfo = () => {
  const gameStoreData = useContext(gameStore);
  const { aboutGame } = gameStoreData;
  const members = aboutGame.gameParticipants

    // 참가자의 포지션 표시
    useEffect(() => {
      members.forEach((member,idx) => {
        const position = member.position
        position.forEach(pos => {
          let select = document.querySelector(`.user${idx} #${pos}`)
          select.className = "istrue"
        })
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
    <div className="teaminfo">
      <p>팀 정보</p>
      <div className="teams">
        <div className="team">
          <p>A팀</p>
          <div className="members">
            {members.map((member, idx) => {
              return member.team === 0? (
                <div className="member">
                  <img id={idx} src={'/images/'+ member.id +'.png'} alt="profile" onMouseOver={over} onMouseOut={out}></img>
                  <div className={'user' + idx + ' userinfo'}>
                    <div className="about__user">
                      <img src={"/images/"+member.id+".png"} alt="member" />
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
                </div>
              ):("")
            })}
          </div>
          <p>A팀 평균 점수는 <span>40</span> 점 이에요!</p>
        </div>
        <div className="team">
          <p>B팀</p>
          <div className="members">
            {members.map((member, idx) => {
              return member.team === 1? (
                <div className="member">
                  <img id={idx} src={'/images/'+ member.id +'.png'} alt="profile" onMouseOver={over} onMouseOut={out}></img>
                  <div className={'user' + idx + ' userinfo'}>
                    <div className="about__user">
                      <img src={"/images/"+member.id+".png"} alt="member" />
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
                </div>
              ):("")
            })}
          </div>
          <p>A팀 평균 점수는 <span>40</span> 점 이에요!</p>
        </div>
        <div className="team">
          <p>C팀</p>
          <div className="members">
            {members.map((member, idx) => {
              return member.team === 2? (
                <div className="member">
                  <img id={idx} src={'/images/'+ member.id +'.png'} alt="profile" onMouseOver={over} onMouseOut={out}></img>
                  <div className={'user' + idx + ' userinfo'}>
                    <div className="about__user">
                      <img src={"/images/"+member.id+".png"} alt="member" />
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
                </div>
              ):("")
            })}
          </div>
          <p>A팀 평균 점수는 <span>40</span> 점 이에요!</p>
        </div>
      </div>
    </div>
  )
}

export default TeamInfo