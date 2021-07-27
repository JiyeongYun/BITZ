import Header from './components/header/Header';
import OffCanvas from './components/header/OffCanvas';
import { BrowserRouter, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import MainPage from './router/game/common/MainPage.js';
import Login from './router/user/common/Login.js';
import Register from './router/user/common/Register.js';
import Profile from './router/user/common/Profile.js';
import RegisterGym from './router/user/business/gym/RegisterGym.js';
import FindPassword from './router/user/common/FindPassword.js';
import ChangePassword from './router/user/common/ChangePassword.js';
import Detail from './router/game/player/GameDetail';

function App() {
  const [offcanvas, setOffcanvas] = useState(false);
  const toggleCanvas = () => {
    setOffcanvas(!offcanvas);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header toggleCanvas={toggleCanvas} />
        <div
          className={offcanvas ? 'grey__canvas grey__canvas__show' : 'grey__canvas'}
          onClick={toggleCanvas}
        ></div>
        <div className={offcanvas ? 'offcanvas__show offcanvas' : 'offcanvas'}>
          <OffCanvas />
        </div>
        <Route path="/" exact={true} component={MainPage}></Route>
        <Route path="/accounts/login" exact={true} component={Login}></Route>
        <Route path="/accounts/register" exact={true} component={Register}></Route>
        <Route path="/profile" exact={true} component={Profile} />
        <Route path="/registerGym" exact={true} component={RegisterGym} />
        <Route path="/accounts/find_password" exact={true} component={FindPassword} />
        <Route path="/accounts/change_password" exact={true} component={ChangePassword} />
        <Route path="/detail" exact={true} component={Detail} />
      </BrowserRouter>
    </div>
  );
}

export default App;
