import React from 'react';
import './MyGym.css';

const MyGym = () => {
  // 내 체육관 관리하기
  const gym = [
    { name: '싸피체육관', address: '서울시 강남구', width: 15, height: 28 },
    { name: '멀티캠퍼스', address: '서울시 강남구', width: 15, height: 28 },
  ];

  const onAddGym = () => {
    alert('체육관 등록');
  };

  return (
    <div className="mygym">
      <div>
        <span className="mygym__span">
          <span className="mygym__title">내 체육관</span>
          <button onClick={onAddGym}>+</button>
        </span>

        {gym.length > 0 &&
          gym.map((object) => (
            <li>
              {object.name} {object.address} {object.height} x {object.width} m
            </li>
          ))}
      </div>
    </div>
  );
};

export default MyGym;
