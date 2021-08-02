import React from 'react'
import './Participant.css'

const Participant = (props) => {
  
  const over = (event) => {
    const {
      target: { id },
    } = event;
    document.getElementsByClassName(`${id}user`)[0].style.display = 'block';
  };

  const out = (event) => {
    const {
      target: { id },
    } = event;
    document.getElementsByClassName(`${id}user`)[0].style.display = 'none';
  };

  return (
    <div className="participant">
      <img
        id={props.idx}
        src={"/images/"+props.user.initial+".jpg"}
        onMouseOver={over}
        onMouseOut={out}
      />
      <div className={props.idx + 'user spec'} kdy={props.idx}>
        <div className="test">
          <div>
            {props.user.name}
            <br />
            {props.user.height}cm
          </div>
        </div>
      </div>
    </div>
  )
}

export default Participant