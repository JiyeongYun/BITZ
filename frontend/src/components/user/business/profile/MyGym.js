import React from 'react';
import './MyGym.css';
import { useHistory  } from 'react-router-dom';

const MyGym = ({gyminfo}) => {
  const history = useHistory();

  const onAddGym = () => {
    history.push('/registergym')
  };

  return (
    <div className="mygym">
      <div className="mygym__container">
        <h3>나의 체육관</h3>
        <button onClick={onAddGym}>추가하기</button>
      </div>
      <div className="mygym__list">
        <div className="list__title">
          <p>체육관명</p>
          <p>위치</p>
        </div>
        {gyminfo ? gyminfo.map(gym => {
          return (
            <div className="gym__info">
              <p>{gym.name}</p>
              <p>{gym.sido} {gym.gugun} {gym.address}</p>
            </div>
          )
        }): null}
      </div>
    </div>
  );
};

export default MyGym;
