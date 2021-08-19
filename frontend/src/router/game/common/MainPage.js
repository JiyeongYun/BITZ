import React, { useContext } from "react"; // useContext import
import "./MainPage.css";
import MainPlayerCommon from "components/game/player/MainPlayerCommon";
import MainBusiness from "components/game/business/Main__Business";
import { store } from 'store/store.js';

function MainPage({history}) {
  const globalState = useContext(store);
  const { value } = globalState;

  return(
    <div className="main">
      {
        value.isLogin && value.userKind === 'business' ? (
          <MainBusiness history={history} />
        ) : (
          <MainPlayerCommon />
        )
      }
    </div>
  ) 
}

export default MainPage;
