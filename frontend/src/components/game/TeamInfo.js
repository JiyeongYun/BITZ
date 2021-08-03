import React, { useState, useEffect } from 'react'
import './TeamInfo.css'

const TeamInfo = () => {

    // 참가자의 포지션 표시
    useEffect(() => {
      members.map((member,idx) => {
        const position = member.position
        position.map(pos => {
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

  const [members, setMembers] = useState([
    {
      initial: 'KOW',
      name: '권오우',
      height: 176,
      position: [
        'guard',
        'forward'
      ],
      manner: 97,
      skill: false,
      photoUrl: '',
    },
    {
      initial: 'PJW',
      name: '박정웅',
      height: 187,
      position: [
        'center'
      ],
      manner: 100,
      skill: 100,
      photoUrl: '',
    },
    {
      initial: 'YJY',
      name: '윤지영',
      height: 170,
      position: [
        'guard'
      ],
      manner: 99,
      skill: 99,
      photoUrl: '',
    },
    {
      initial: 'LSE',
      name: '이소은',
      height: 173,
      position: [
        'guard'
      ],
      manner: 98,
      skill: 98,
      photoUrl: '',
    },
    {
      initial: 'JHW',
      name: '장현웅',
      height: 184,
      position: [
        'forward'
      ],
      manner: 97,
      skill: 97,
      photoUrl: '',
    },
  ]);

  return (
    <div className="teaminfo">
      <p>팀 정보</p>
      <div className="teams">
        <div className="team">
          <p>A팀</p>
          <div className="members">
            {members.map((member, idx) => {
              return (
                <div className="member">
                  <img id={idx} src={'/images/'+ member.initial +'.png'} alt="profile" onMouseOver={over} onMouseOut={out}></img>
                  <div className={'user' + idx + ' userinfo'}>
                    <div className="about__user">
                      <img src={"/images/"+member.initial+".png"} />
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
              )
            })}
          </div>
          <p>A팀 평균 점수는 <span>40</span> 점 이에요!</p>
        </div>
        <div className="team">
          <p>B팀</p>
          <div className="members">
            {members.map((member, idx) => {
              return (
                <div className="member">
                  <img id={idx} src={'/images/'+ member.initial +'.png'} alt="profile" onMouseOver={over} onMouseOut={out}></img>
                  <div className={'user' + idx + ' userinfo'}>
                    <div className="about__user">
                      <img src={"/images/"+member.initial+".png"} />
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
              )
            })}
          </div>
          <p>A팀 평균 점수는 <span>40</span> 점 이에요!</p>
        </div>
        <div className="team">
          <p>C팀</p>
          <div className="members">
            {members.map((member, idx) => {
              return (
                <div className="member">
                  <img id={idx} src={'/images/'+ member.initial +'.png'} alt="profile" onMouseOver={over} onMouseOut={out}></img>
                  <div className={'user' + idx + ' userinfo'}>
                    <div className="about__user">
                      <img src={"/images/"+member.initial+".png"} />
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
              )
            })}
          </div>
          <p>A팀 평균 점수는 <span>40</span> 점 이에요!</p>
        </div>
      </div>
    </div>
  )
}

export default TeamInfo