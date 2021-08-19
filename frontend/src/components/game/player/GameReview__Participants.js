import React, { useEffect, useContext, useState } from 'react'
import { gameStore } from 'store/gameStore';
import GameReviewParticipantsMiniInfo from './GameReview__participants_miniInfo';
import "./GameReview__Participants.css"

const GameReview__Participants = ({ reviewType, setReviewScore, reviewScore, mode }) => {
  const gameStoreData = useContext(gameStore);
  const { aboutGame } = gameStoreData;

  const [members, setMembers] = useState(aboutGame.gameParticipantDetails)
  
  useEffect(()=>{
    setMembers(aboutGame.gameParticipantDetails)
  },[aboutGame.gameParticipantDetails])
  
  // 참가자의 포지션 표시
  useEffect(() => {
    members.forEach((member,idx) => {
      if (member.center) {
        let select = document.querySelector(`.${reviewType}user${idx} #center`)
        if (select) {
          select.className = "istrue"
        }
      }
      if (member.forward) {
        let select = document.querySelector(`.${reviewType}user${idx} #forward`)
        if (select) {
          select.className = "istrue"
        }
      }
      if (member.guard) {
        let select = document.querySelector(`.${reviewType}user${idx} #guard`)
        if (select) {
          select.className = "istrue"
        }
      }
    })
  }, [members])

  // 선택되지 않은 참가자 제거 (정확히는 모든 참가자의 선택사항 display를 none으로 초기화)
  useEffect(() => {
    for (let idx=0;idx<members.length;idx++){
      let select1 = document.querySelector(`.mvp${idx} .Participants__selected`)
      if (select1) {
        select1.style.display = 'none';
      }
    }
  }, [reviewScore, members.length, members])

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
      let value = event.target.id
      let resetGood = reviewScore.goodPeople
      resetGood = resetGood.filter(element=>element!==event.target.id)
      let resetBad = reviewScore.badPeople
      resetBad = resetBad.filter(element=>element!==event.target.id)
      
      setReviewScore({...reviewScore, manner: value, goodPeople: resetGood, badPeople: resetBad})
    }
  }

  // Manner 부분 클릭 시 추천/비추천 선택으로 변경

  const selectMannerType = (event) => {
    const idx = event.target.id.split('People')[1]
    const type = event.target.id.split(idx)[0]
    let value = ""
    const mannerType = reviewScore[type]
    // mannerType.
    mannerType.push(idx)
    setReviewScore({...reviewScore, manner: value, [type]: mannerType})
  }


  return (
    <div className="teaminfo">
      <div className="teams">
        <div className="team">
          <p>A팀</p>
          <div className="members">
            {members.map((member, idx) => {
              return member.team === 1? (
                <div className={`member ${reviewType}${idx}`}>
                  <div className="Participants__selected">
                    { reviewType==="manner"&&(reviewScore.manner.includes(`${idx}`))? 
                      <div className="manner__overlay">
                        <div onClick={selectMannerType} id={`badPeople${idx}`} >
                          <img src='/images/unlike.png' id={`badPeople${idx}`} alt="mvp" className="select_manner" />
                          <span id={`badPeople${idx}`} >비추천</span>
                        </div>
                        <div onClick={selectMannerType} id={`goodPeople${idx}`} >
                          <img src='/images/like.png' id={`goodPeople${idx}`} alt="mvp" className="select_manner" />
                          <span id={`goodPeople${idx}`} >추천</span>
                        </div>
                      </div> : <div></div>
                    }
                    { mode==='mvp'? 
                      <img src='/images/mvp.png' alt="mvp" className="gameReview__badge" /> :
                      <div>
                        { (reviewScore.goodPeople.includes(`${idx}`))? 
                          <img src='/images/like.png' alt="like" className="gameReview__badge" /> 
                          : <div />
                        }
                        { (reviewScore.badPeople.includes(`${idx}`))? 
                          <img src='/images/unlike.png' alt="unlike" className="gameReview__badge" /> 
                          : <div />
                        }
                      </div>
                    }
                  </div>
                  <img id={idx} src='/images/symbol.png' alt="profile" onMouseOver={over} onMouseOut={out} onClick={select}  className="round_profile"></img>      
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
              return member.team === 2? (
                <div className={`member ${reviewType}${idx}`}>
                <div className="Participants__selected">
                  { reviewType==="manner"&&(reviewScore.manner.includes(`${idx}`))? 
                    <div className="manner__overlay">
                      <div onClick={selectMannerType} id={`badPeople${idx}`} >
                        <img src='/images/unlike.png' id={`badPeople${idx}`} alt="mvp" className="select_manner" />
                        <span id={`badPeople${idx}`} >비추천</span>
                      </div>
                      <div onClick={selectMannerType} id={`goodPeople${idx}`} >
                        <img src='/images/like.png' id={`goodPeople${idx}`} alt="mvp" className="select_manner" />
                        <span id={`goodPeople${idx}`} >추천</span>
                      </div>
                    </div> : <div></div>
                  }
                  { mode==='mvp'? 
                    <img src='/images/mvp.png' alt="mvp" className="gameReview__badge" /> :
                    <div>
                      { (reviewScore.goodPeople.includes(`${idx}`))? 
                        <img src='/images/like.png' alt="like" className="gameReview__badge" /> 
                        : <div />
                      }
                      { (reviewScore.badPeople.includes(`${idx}`))? 
                        <img src='/images/unlike.png' alt="unlike" className="gameReview__badge" /> 
                        : <div />
                      }
                    </div>
                  }
                </div>
                  <img id={idx} src='/images/symbol.png' alt="profile" onMouseOver={over} onMouseOut={out} onClick={select}  className="round_profile"></img>
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
              return member.team === 3? (
                <div className={`member ${reviewType}${idx}`}>
                <div className="Participants__selected">
                  { reviewType==="manner"&&(reviewScore.manner.includes(`${idx}`))? 
                    <div className="manner__overlay">
                      <div onClick={selectMannerType} id={`badPeople${idx}`} >
                        <img src='/images/unlike.png' id={`badPeople${idx}`} alt="mvp" className="select_manner" />
                        <span id={`badPeople${idx}`} >비추천</span>
                      </div>
                      <div onClick={selectMannerType} id={`goodPeople${idx}`} >
                        <img src='/images/like.png' id={`goodPeople${idx}`} alt="mvp" className="select_manner" />
                        <span id={`goodPeople${idx}`} >추천</span>
                      </div>
                    </div> : <div></div>
                  }
                  { mode==='mvp'? 
                    <img src='/images/mvp.png' alt="mvp" className="gameReview__badge" /> :
                    <div>
                      { (reviewScore.goodPeople.includes(`${idx}`))? 
                        <img src='/images/like.png' alt="like" className="gameReview__badge" /> 
                        : <div />
                      }
                      { (reviewScore.badPeople.includes(`${idx}`))? 
                        <img src='/images/unlike.png' alt="unlike" className="gameReview__badge" /> 
                        : <div />
                      }
                    </div>
                  }
                </div>
                  <img id={idx} src={'/images/symbol.png'} alt="profile" onMouseOver={over} onMouseOut={out} onClick={select}  className="round_profile"></img>
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