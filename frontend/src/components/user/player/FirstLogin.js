import React, { useState } from 'react'
import './FirstLogin.css'

function FirstLogin() {
  const [guardChecked, setGuardChecked] = useState(false)
  const [forwardChecked, setForwardChecked] = useState(false)
  const [centerChecked, setCenterChecked] = useState(false)
  const [lowChecked, setLowChecked] = useState(false)
  const [midChecked, setMidChecked] = useState(false)
  const [topChecked, setTopChecked] = useState(false)

  function setAbility(e) {
    if (e.target.id === 'low' && lowChecked === false) {
      setLowChecked(true)
      setMidChecked(false)
      setTopChecked(false)
    } else if (e.target.id === 'mid' && midChecked === false) {
      setLowChecked(false)
      setMidChecked(true)
      setTopChecked(false)
    } else if (e.target.id === 'top' && topChecked === false) {
      setLowChecked(false)
      setMidChecked(false)
      setTopChecked(true)
    } else {
      setLowChecked(false)
      setMidChecked(false)
      setTopChecked(false)
    }
  }

  return (
    <div className="fl">
      <div className="fl__text">
          <div>실력에 맞는 팀 배정, 나에게 맞는 픽업 게임 추천을 위한 데이터에요.</div>
          <div>재미있는 경기를 위해서 아래의 정보들을 입력해 주세요!</div>
      </div>
      <div className="fl__data">
        <div className="data__container">
          <div className="height__box">
            <label htmlFor="height">키가 어떻게 되시나요?<br/>
              <input type="text" name="height" id="height__input"/>  cm
            </label>
          </div>
          <div className="position__box">
            <label htmlFor="position">어떤 포지션을 주로 맡나요?
              <br/>
              <span>0~3개를 골라주세요</span>
              <div className="ps__checkbox">
                <input type="checkbox" name="position" value="guard" /><span className={guardChecked ? "checked" : null} onClick={() => setGuardChecked(!guardChecked)}>가드</span>
                <input type="checkbox" name="position" value="forward" /><span className={forwardChecked ? "checked" : null} onClick={() => setForwardChecked(!forwardChecked)}>포워드</span>
                <input type="checkbox" name="position" value="center" /><span className={centerChecked ? "checked" : null} onClick={() => setCenterChecked(!centerChecked)}>센터</span>
              </div>
            </label>
          </div>
          <div className="ability__box">
            <label htmlFor="ability">본인의 농구 실력은?
              <div className="ab__checkbox">
                <input type="radio" name="ability" value="low"/><span id="low" className={lowChecked ? "checked" : null} onClick={setAbility}>농구가 <br/>처음이에요</span>
                <input type="radio" name="ability" value="mid"/><span id="mid" className={midChecked ? "checked" : null} onClick={setAbility}>농구가 <br/>취미에요</span>
                <input type="radio" name="ability" value="top"/><span id="top" className={topChecked ? "checked" : null} onClick={setAbility}>자칭타칭 <br/>농구 고수!</span>
              </div>
            </label>
          </div>
          <div className="location__box">
            <div>선호 지역이 있으신가요?</div>
            <div>최대 3개 선택 가능</div>
            <div className="location__data">
              <div>A</div>
              <div>B</div>
              <div>C</div>
            </div>
          </div>
          <button>픽업 게임 하러가기</button>
        </div>
      </div>
    </div>
  )
}

export default FirstLogin