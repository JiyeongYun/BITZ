import Header from './components/header/Header';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import MainPage from './router/game/common/MainPage.js';
import Login from './router/user/common/Login.js';
import Register from './router/user/common/Register.js';
import Profile from './router/user/common/Profile';
import RegisterGym from './router/user/business/gym/RegisterGym';
import FindPassword from './router/user/common/FindPassword';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Route path="/" exact={true} component={MainPage}></Route>
        <Route path="/accounts/login" exact={true} component={Login}></Route>
        <Route path="/accounts/register" exact={true} component={Register}></Route>
        <Route path="/profile" exact={true} component={Profile} />
        <Route path="/registerGym" exact={true} component={RegisterGym} />
        <Route path="/accounts/find_password" exact={true} component={FindPassword} />
      </BrowserRouter>
    </div>
  );
}

export default App;
