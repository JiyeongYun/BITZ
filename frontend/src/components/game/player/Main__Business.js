import React, { useContext } from "react"
import "./Main__Business.css"
import { store } from 'store/store.js';

function Main__Business () {
  const globalState = useContext(store);
  const { value, dispatch } = globalState;

  return (
    <div className="MainBusiness">
      <div>
        <div className="MainBusiness__top">
          <div>게임 관리하기</div>
          <div className="MainBusiness__top_links">
            <div>
              모든 게임 보기
            </div>
            <div>
              |
            </div>
            <div>
              게임 추가하기
            </div>
          </div>
        </div>
        <div className="MainBusiness__allGameList">
          ??
        </div>
      </div>
    </div>
  )
}

export default Main__Business