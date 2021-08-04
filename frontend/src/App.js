import Header from './components/header/Header';
import OffCanvas from './components/header/OffCanvas';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { useContext, useState } from 'react';
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

  const [offcanvas, setOffcanvas] = useState(false);
  const toggleCanvas = () => {
    setOffcanvas(!offcanvas);
  };

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
            <Login />
          </Route>
        )}
        <Route path="/accounts/register" exact={true} component={Register}></Route>
        <Route path="/accounts/profile/:email" exact={true} component={Profile} />
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
