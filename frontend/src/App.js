import Header from './components/header/Header';
import OffCanvas from './components/header/OffCanvas';
import { BrowserRouter, Redirect, Route, useHistory } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import './App.css';
import MainPage from './router/game/common/MainPage.js';
import Login from './router/user/common/Login.js';
import Register from './router/user/common/Register.js';
import Profile from './router/user/common/Profile.js';
import RegisterGym from './router/user/business/gym/RegisterGym.js';
import FindPassword from './router/user/common/FindPassword.js';
import ChangePassword from './router/user/common/ChangePassword.js';
import Detail from './router/game/player/GameDetail';
import MyGame from './router/game/player/MyGame';
import { store } from 'store/store.js'; // store import (store)
import { GameStateProvider } from 'store/gameStore.js';

function App() {
  // 전역 상태 관리 (store)
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const [offcanvas, setOffcanvas] = useState(false);
  const history = useHistory();
  const toggleCanvas = () => {
    setOffcanvas(!offcanvas);
  };

  // const [userObj, setUserObj] = useState(null);

  const changeUserObj = async (data) => {
    // 로그인 시 email 전역 상태에 저장 (store)
    await dispatch({ type: "LOGIN", value: data.email })
    // await setUserObj(data);
    console.log('히스토리 : ' + history);
  };

  useEffect(() => {
    // if (userObj) {
    // }
  });

  return (
    <div className="App">
      <BrowserRouter>
        {/* <Header toggleCanvas={toggleCanvas} userObj={userObj} /> */}
        <Header toggleCanvas={toggleCanvas} />
        <div
          className={offcanvas ? 'grey__canvas grey__canvas__show' : 'grey__canvas'}
          onClick={toggleCanvas}
        ></div>
        <div className={offcanvas ? 'offcanvas__show offcanvas' : 'offcanvas'}>
          <OffCanvas />
        </div>
        <Route path="/" exact={true} component={MainPage}></Route>
        {globalState.value.isLogin ? (
          <Redirect to="/" />
        ) : (
          <Route exact path="/accounts/login">
            {/* <Login changeUserObj={changeUserObj} userObj={userObj} /> */}
            <Login changeUserObj={changeUserObj} />
          </Route>
        )}

        <Route path="/accounts/register" exact={true} component={Register}></Route>
        <Route path="/accounts/profile/:cryptojs" exact={true} component={Profile} /> {/* cryptojs를 사용한 암호화 */}
        <Route path="/registerGym" exact={true} component={RegisterGym} />
        <Route path="/accounts/find_password" exact={true} component={FindPassword} />
        <Route path="/accounts/change_password" exact={true} component={ChangePassword} />
        {/* Detail의 경우 연결된 컴포넌트가 많아서 전역 변수화 */}
        <GameStateProvider>
          <Route path="/detail" exact={true} component={Detail} />
        </GameStateProvider>
        <Route path="/match/mygames" exact={true} component={MyGame} />
      </BrowserRouter>
    </div>
  );
}

export default App;
