import Header from './components/header/Header';
import OffCanvas from './components/header/OffCanvas';
import { BrowserRouter, Route } from 'react-router-dom';
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
import { GameStateProvider } from 'store/gameStore.js';
import { store } from 'store/store';

function App() {
  
  // 전역 상태 관리 (store)
  const globalState = useContext(store);
  const { dispatch } = globalState;

  // 로그인 정보 확인
  useEffect(() => {
    // 플레이어 로그인
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) ?? null
    if (currentUser) {
      dispatch({type: "LOGIN", value:currentUser.email})
    }
    // 비즈니스 로그인
    const currentUserbusiness = JSON.parse(localStorage.getItem('currentUserbusiness')) ?? null
    if (currentUserbusiness) {
      dispatch({ type: "SELECT_USER_KIND", value: "business" })
      dispatch({type: "LOGIN", value:currentUserbusiness.email})
    }
  }, [dispatch])

  // offcanvas
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
        <Route path="/" exact={true} component={MainPage} />
        <Route path="/registerGym" exact={true} render={() => <RegisterGym pageState="regist" />} />
        <Route path="/accounts/login" exact={true} component={Login} />
        <Route path="/accounts/register" exact={true} component={Register}></Route>
        <Route path="/accounts/profile/:cryptojs" exact={true} component={Profile} /> {/* cryptojs를 사용한 암호화 */}
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
