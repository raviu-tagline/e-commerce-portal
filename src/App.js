import "./App.css";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { Nav, Navbar, NavLink } from "react-bootstrap";
import Main from "./reusableComponents/headers/mainHeader";
import {
  faHome,
  faList,
  faPlus,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Home from "./components/Home";
import Login from "./components/Login";
import Helmet from "react-helmet";
import Navigation from "./reusableComponents/headers/NavBar";
import Common from "./reusableComponents/Common";
import Register from "./components/Register";
import "./custom.css";

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>E-Commerce-Portal</title>
      </Helmet>
      <Router>
        <Main />
        <Navigation />
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/create">
          <Register />
        </Route>
        <Route path="/menfashion">
          <Common title="Men's fashion page" />
        </Route>
        <Route path="/womenfashion">
          <Common title="Women's fashion page" />
        </Route>
        <Route path="/electronics">
          <Common title="Electronics page" />
        </Route>
      </Router>
    </div>
  );
}

export default App;
