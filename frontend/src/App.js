import Header from './components/header/Header';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import MainPage from './router/game/common/MainPage.js';
import Login from './router/user/common/Login.js';
import Register from './router/user/common/Register.js';
import Profile from './router/user/common/Profile.js';
import RegisterGym from './router/user/business/gym/RegisterGym.js';
import FindPassword from './router/user/common/FindPassword.js';
import ChangePassword from './router/user/common/ChangePassword.js'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Route path="/" exact={true} component={MainPage} />
        <Route path="/accounts/login" exact={true} component={Login} />
        <Route path="/accounts/register" exact={true} component={Register} />
        <Route path="/profile" exact={true} component={Profile} />
        <Route path="/registerGym" exact={true} component={RegisterGym} />
        <Route path="/accounts/find_password" exact={true} component={FindPassword} />
        <Route path="/accounts/change_password" exact={true} component={ChangePassword} />
      </BrowserRouter>
    </div>
  );
}

export default App;
