import "./App.css";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
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
import { ToastContainer } from "react-toastify";
import AdminDash from "./components/Admin/AdminDash";
import SupplierDash from "./components/Supplier/SupplierDash";
import CustomerDash from "./components/Customer/CustomerDash";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>E-Commerce-Portal</title>
      </Helmet>
      <Router>
        <Main />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/logout">
            {localStorage.clear()}
            <Redirect to="/login" />
          </Route>
          <Route path="/create">
            <Register />
          </Route>
          <ProtectedRoute
            path="/admin/dashboard"
            component={AdminDash}
            role="admin"
          />
          <ProtectedRoute
            path="/supplier/dashboard"
            component={SupplierDash}
            role="supplier"
          />
          <ProtectedRoute
            path="/customer/dashboard"
            component={CustomerDash}
            role="customer"
          />
          {/* <Main />
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
        </Route> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
