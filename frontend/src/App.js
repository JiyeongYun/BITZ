import Header from './components/header/Header';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import MainPage from './router/game/common/MainPage.js';
import Login from './router/user/common/Login.js';
import Register from './router/user/common/Register.js';
import Profile from './router/user/common/Profile';
import FirstLogin from "./components/user/player/FirstLogin";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Route path="/" exact={true} component={MainPage}></Route>
        <Route path="/accounts/login" exact={true} component={Login}></Route>
        <Route path="/accounts/register" exact={true} component={Register}></Route>
        <Route path="/profile" exact={true} component={Profile} />
      </BrowserRouter>
    </div>
  );
}

export default App;
