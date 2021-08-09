import React, { useEffect, useContext } from 'react'
import { gameStore } from 'store/gameStore';
import GameReviewParticipantsMiniInfo from './GameReview__participants_miniInfo';
import "./GameReview__Participants.css"
import UserApi from 'api/UserApi';

const GameReview__Participants = ({ reviewType, setReviewScore, reviewScore }) => {
  const gameStoreData = useContext(gameStore);
  const { aboutGame, gameDispatch } = gameStoreData;
  
  useEffect(()=>{
    const newData = []

    aboutGame.gameParticipantList.forEach((member)=>{

      UserApi.myprofile({email: member.userId.email},
        (res) => {
          newData.push(res.data)
        },
        (error) => {
          console.log(error)
        }
        )
      })

      gameDispatch({ type: 'FETCH_PARTICIPANTS_DETAIL', value: newData })
    },[aboutGame.gameParticipantList])
    
  const members = aboutGame.gameParticipantDetails
  
  // 참가자의 포지션 표시
  useEffect(() => {
    members.forEach((member,idx) => {
      if (member.center) {
        let select = document.querySelector(`.${reviewType}user${idx} #center`)
        select.className = "istrue"
      }
      if (member.forward) {
        let select = document.querySelector(`.${reviewType}user${idx} #forward`)
        select.className = "istrue"
      }
      if (member.guard) {
        let select = document.querySelector(`.${reviewType}user${idx} #guard`)
        select.className = "istrue"
      }
    })
  }, [aboutGame.gameParticipantDetails])

  // 선택되지 않은 참가자 제거 (정확히는 모든 참가자의 선택사항 display를 none으로 초기화)
  useEffect(() => {
    for (let idx=0;idx<members.length;idx++){
      document.querySelector(`.mvp${idx} .Participants__selected`).style.display = 'none';
      document.querySelector(`.manner${idx} .Participants__selected`).style.display = 'none';
    }
  }, [reviewScore, members.length])

  // 커서 올라가면 참가자 정보 표시
  const over = (event) => {
    const {
      target: { id },
    } = event;
    document.querySelector(`.${reviewType}user${id}`).style.display = 'block';
  };
  
  // 커서 내려가면 참가자 정보 가림
  const out = (event) => {
    const {
      target: { id },
    } = event;
    document.querySelector(`.${reviewType}user${id}`).style.display = 'none';
  };

  // MVP, Manner 인원 선택
  const select = (event) => {
    if (reviewType==="mvp") {
      let value = ""
      if (reviewScore.mvp!==event.target.id) {
        value = event.target.id
      }
      setReviewScore({...reviewScore, mvp: value})
    } else if (reviewType==="manner") {
      let value = reviewScore.manner
      if (value.includes(event.target.id)) {
        value = value.filter(element=>element!==event.target.id)
      } else {
        value.push(event.target.id)
      }
      setReviewScore({...reviewScore, manner: value})
    }
  }


  return (
    <div className="teaminfo">
      <div className="teams">
        <div className="team">
          <p>A팀</p>
          <div className="members">
            {members.map((member, idx) => {
              return member.team === 0? (
                <div className={`member ${reviewType}${idx}`}>
                  <div className="Participants__selected">O</div>
                  <img id={idx} src={'/images/'+ member.id +'.png'} alt="profile" onMouseOver={over} onMouseOut={out} onClick={select}></img>      
                  <GameReviewParticipantsMiniInfo idx={idx} member={member} reviewType={reviewType} />
                </div>
              ):("")
            })}
          </div>
        </div>
        <div className="team">
          <p>B팀</p>
          <div className="members">
            {members.map((member, idx) => {
              return member.team === 1? (
                <div className={`member ${reviewType}${idx}`}>
                  <div className="Participants__selected">O</div>
                  <img id={idx} src={'/images/'+ member.id +'.png'} alt="profile" onMouseOver={over} onMouseOut={out} onClick={select}></img>
                  <GameReviewParticipantsMiniInfo idx={idx} member={member} reviewType={reviewType} />
                </div>
              ):("")
            })}
          </div>
        </div>
        <div className="team">
          <p>C팀</p>
          <div className="members">
            {members.map((member, idx) => {
              return member.team === 2? (
                <div className={`member ${reviewType}${idx}`}>
                  <div className="Participants__selected">O</div>
                  <img id={idx} src={'/images/'+ member.id +'.png'} alt="profile" onMouseOver={over} onMouseOut={out} onClick={select}></img>
                  <GameReviewParticipantsMiniInfo idx={idx} member={member} reviewType={reviewType} />
                </div>
              ):("")
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameReview__Participants