import Header from './components/header/Header';
import OffCanvas from './components/header/OffCanvas';
import { BrowserRouter, Redirect, Route, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
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

function App() {
  const [offcanvas, setOffcanvas] = useState(false);
  const history = useHistory();
  const toggleCanvas = () => {
    setOffcanvas(!offcanvas);
  };

  const [userObj, setUserObj] = useState(null);

  const changeUserObj = async (data) => {
    await setUserObj(data);
    console.log('히스토리 : ' + history);
  };

  useEffect(() => {
    if (userObj) {
    }
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Header toggleCanvas={toggleCanvas} userObj={userObj} />
        <div
          className={offcanvas ? 'grey__canvas grey__canvas__show' : 'grey__canvas'}
          onClick={toggleCanvas}
        ></div>
        <div className={offcanvas ? 'offcanvas__show offcanvas' : 'offcanvas'}>
          <OffCanvas />
        </div>
        <Route path="/" exact={true} component={MainPage}></Route>
        {userObj ? (
          <Redirect to="/" />
        ) : (
          <Route exact path="/accounts/login">
            <Login changeUserObj={changeUserObj} userObj={userObj} />
          </Route>
        )}

        <Route path="/accounts/register" exact={true} component={Register}></Route>
        <Route path="/profile" exact={true} component={Profile} />
        <Route path="/registerGym" exact={true} component={RegisterGym} />
        <Route path="/accounts/find_password" exact={true} component={FindPassword} />
        <Route path="/accounts/change_password" exact={true} component={ChangePassword} />
        <Route path="/detail" exact={true} component={Detail} />
        <Route path="/match/mygames" exact={true} component={MyGame} />
      </BrowserRouter>
    </div>
  );
}

export default App;
