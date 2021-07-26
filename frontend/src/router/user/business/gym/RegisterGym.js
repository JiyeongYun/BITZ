import React, { useState } from 'react';
import './RegisterGym.css';

const RegisterGym = () => {
  // 비즈니스 유저가 체육관 등록하는 페이지

  const [pageState, setPageState] = useState('regist');
  const [gymName, setGymName] = useState('');
  const [gymPhotoUrl, setGymPhotoUrl] = useState(null);
  const [gymDesc, setGymDesc] = useState('');
  const [courtLength, setCourtLength] = useState('');
  const [courtWidth, setCourtWidth] = useState('');

  const onFileChange = (event) => {
    alert('파일등록');
  };
  const onAddGymPhoto = (event) => {
    event.preventDefault();
    alert('시설사진 등록');
  };

  const onSubmit = (event) => {
    event.preventDefault();
    alert(gymName + ' ' + gymDesc + ' ' + courtLength + ' ' + courtWidth);

    let clickedE = document.getElementsByClassName('clicked');

    for (let i = 0; i < clickedE.length; i++) {
      alert(clickedE[i].getAttribute('value'));
    }
  };

  const onClickTest = (event) => {
    event.preventDefault();
    const { target } = event;

    if (target.classList.contains('test2')) target.classList.remove('test2');
    else target.classList.add('test2');

    console.log(target.classList);
  };

  const onClickFacilities = (event) => {
    event.preventDefault();
    const { target } = event;

    if (target.className === 'clicked') {
      target.className = 'unClicked';
    } else target.className = 'clicked';
  };

  const onSearchAddress = (event) => {
    event.preventDefault();
    alert('주소검색');
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === 'gymName') {
      setGymName(value);
    }

    if (name === 'gymDesc') {
      setGymDesc(value);
    }

    if (name === 'courtLength') {
      setCourtLength(value);
    }

    if (name === 'courtWidth') {
      setCourtWidth(value);
    }
  };

  return (
    <div className="registerGym__div">
      <h1>체육관 등록</h1>
      <div className="registerGymForm__div">
        <form className="registerGymForm" onSubmit={onSubmit}>
          <div className="gymInfo__div">
            체육관 이름 <br />
            코드가 여러 개면 코트 별로 등록해주세요. (ex. 싸피체육관 1관)
            <br />
            <input type="text" name="gymName" className="gymName" onChange={onChange}></input>
            <br />
            체육관 소개
            <br />
            <textarea name="gymDesc" className="gymDesc" onChange={onChange}></textarea>
            <br />
            코드 규격
            <br />
            <input type="text" name="courtLength" className="courtSize" onChange={onChange} /> m X{' '}
            <input type="text" name="courtWidth" className="courtSize" onChange={onChange} /> m
            <br />
            위치
            <br />
            <input type="text" name="address" className="address" />{' '}
            <button onClick={onSearchAddress}>주소 검색</button>
          </div>
          <br />
          <div className="facilities__div">
            편의 시설
            <br />
            <table className="facilities__table">
              <tr>
                <td value="water" id="water" className="unClicked" onClick={onClickFacilities} />

                <td value="shower" id="shower" className="unClicked" onClick={onClickFacilities} />

                <td
                  value="scoreboard"
                  id="scoreboard"
                  className="unClicked"
                  onClick={onClickFacilities}
                />
              </tr>
              <tr>
                <td
                  value="parking"
                  id="parking"
                  className="unClicked"
                  onClick={onClickFacilities}
                />

                <td
                  value="basketball"
                  id="basketball"
                  className="unClicked"
                  onClick={onClickFacilities}
                />

                <td
                  value="airconditioner"
                  id="airconditioner"
                  className="unClicked"
                  onClick={onClickFacilities}
                />
              </tr>
            </table>
          </div>
          <div className="test" value="test" onClick={onClickTest}>
            {' '}
          </div>
          시설 사진
          <br />
          {gymPhotoUrl ? (
            <img src="" alt="gymPhoto" />
          ) : (
            <div onClick={onAddGymPhoto} className="gymPhoto__box">
              +
            </div>
          )}
          {gymPhotoUrl ? (
            <img src="" alt="gymPhoto" />
          ) : (
            <div onClick={onAddGymPhoto} className="gymPhoto__box">
              +
            </div>
          )}
          <br />
          <div className="filebox">
            <input
              class="upload-name"
              value="파일선택"
              disabled="disabled"
              style={{
                opacity: 0,
              }}
            />
            <label for="ex_filename"> + </label>
            <input type="file" id="ex_filename" class="upload-hidden" />
          </div>
          <div className="filebox">
            <input
              class="upload-name"
              value="파일선택"
              disabled="disabled"
              style={{
                opacity: 0,
              }}
            />
            <label for="ex_filename"> + </label>
            <input type="file" id="ex_filename" class="upload-hidden" />
          </div>
          {pageState === 'regist' ? (
            <button type="submit">등록</button>
          ) : (
            <button type="submit">수정</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegisterGym;
