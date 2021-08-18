import React from "react";
import { Link } from "react-router-dom";
import "./NoGameList.css";

function NoGameList() {
  return (
    <div className="nogame">
      <div className="content">
        <p>아직 예약한 게임이 없네요.<br/>서둘러 게임을 예약해보세요!</p>
        <Link to="/">예약하러 갈래요!</Link>
      </div>
    </div>
  );
}

export default NoGameList;
