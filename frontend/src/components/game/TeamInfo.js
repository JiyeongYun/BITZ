import React, { useEffect, useContext, useState } from 'react';
import './TeamInfo.css';
import { gameStore } from 'store/gameStore';
import GameApi from 'api/GameApi';

const TeamInfo = () => {
  const gameStoreData = useContext(gameStore);
  const { aboutGame } = gameStoreData;
    
  const members = aboutGame.gameParticipantDetails

  
  useEffect(()=>{
    if (aboutGame.gameState>=1) {
      GameApi.Teaming({gameId: aboutGame.gameInfo.id},
        (res)=>{console.log(res.data)},
        (err)=>{console.log(err)}
        )
      }
  },[])
  
  // 참가자의 포지션 표시
  useEffect(() => {
    members.forEach((member,idx) => {
      if (member.center) {
        let select = document.querySelector(`.user${idx} #center`)
        if (select) {
          select.className = "istrue"
        }
      }
      if (member.forward) {
        let select = document.querySelector(`.user${idx} #forward`)
        if (select) {
        select.className = "istrue"
        }
      }
      if (member.guard) {
        let select = document.querySelector(`.user${idx} #guard`)
        if (select) {
        select.className = "istrue"
        }
      }
    })

    if (aboutGame.gameParticipantDetails.length === aboutGame.gameParticipantList.length) {
      setFetchDataComplete(true)
    }
  }, [aboutGame])


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

  // Data 모두 받았는지 확인
  const [fetchDataComplete, setFetchDataComplete] = useState(false)

  return (
    <div className="teaminfo">
      <p>팀 정보</p>
      <div className="teams">
        <div className="team">
          <p>A팀</p>
          <div className="members">
            {members.map((member, idx) => {
              return member.team === 1? (
                <div className="member" key={idx}>
                  <img id={idx} src='/images/symbol.png' alt="profile" onMouseOver={over} onMouseOut={out}></img>
                  <div className={'user' + idx + ' userinfo'}>
                    <div className="about__user">
                      <img src='/images/symbol.png' alt="member" />
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
          <p>A팀 평균 점수는 <span>{fetchDataComplete?(aboutGame.gameParticipantDetails.reduce((acc, curr)=>(curr.team===1?acc+curr.skill:acc),0)/(aboutGame.gameParticipantDetails.filter(({team})=>team===1).length||1)).toFixed(1):0}</span> 점 이에요!</p>
        </div>
        <div className="team">
          <p>B팀</p>
          <div className="members">
            {members.map((member, idx) => {
              return member.team === 2? (
                <div className="member" key={idx}>
                  <img id={idx} src='/images/symbol.png' alt="profile" onMouseOver={over} onMouseOut={out}></img>
                  <div className={'user' + idx + ' userinfo'}>
                    <div className="about__user">
                      <img src='/images/symbol.png' alt="member" />
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
          <p>B팀 평균 점수는 <span>{fetchDataComplete?(aboutGame.gameParticipantDetails.reduce((acc, curr)=>(curr.team===2?acc+curr.skill:acc),0)/(aboutGame.gameParticipantDetails.filter(({team})=>team===2).length||1)).toFixed(1):0}</span> 점 이에요!</p>
        </div>
        { aboutGame.gameParticipantList.find(part=>part.team===3) ? 
        <div className="team">
          <p>C팀</p>
          <div className="members">
            {members.map((member, idx) => {
              return member.team === 3? (
                <div className="member" key={idx}>
                  <img id={idx} src='/images/symbol.png' alt="profile" onMouseOver={over} onMouseOut={out}></img>
                  <div className={'user' + idx + ' userinfo'}>
                    <div className="about__user">
                      <img src='/images/symbol.png' alt="member" />
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
          <p>C팀 평균 점수는 <span>{fetchDataComplete?(aboutGame.gameParticipantDetails.reduce((acc, curr)=>(curr.team===3?acc+curr.skill:acc),0)/(aboutGame.gameParticipantDetails.filter(({team})=>team===3).length||1)).toFixed(1):0}</span> 점 이에요!</p>
        </div>
        : <div />
        }
      </div>
    </div>
  )
}

export default TeamInfo