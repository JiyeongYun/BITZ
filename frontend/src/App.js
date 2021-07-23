import Header from "./components/header/Header"
import { BrowserRouter, Route } from "react-router-dom"
import "./App.css"
import MainPage from "./router/game/common/MainPage.js"
import Login from "./router/user/common/login.js"
import Register from "./router/user/common/register.js"
import FirstLogin from "./components/user/player/FirstLogin"

function App() {
  return (
    <div className="App">
      <Header />
      <FirstLogin />
      <BrowserRouter>
        <Route path="/" exact={true} component={MainPage}></Route>
        <Route path="/accounts/login" exact={true} component={Login}></Route>
        <Route path="/accounts/register" exact={true} component={Register}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
