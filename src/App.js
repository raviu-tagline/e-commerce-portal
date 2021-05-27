import "./App.css";
import "./style.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Helmet from "react-helmet";
import Register from "./components/Register";
import "./custom.css";
import { Slide, toast, ToastContainer } from "react-toastify";
import AdminDash from "./components/Admin/AdminDash";
import SupplierDash from "./components/Supplier/SupplierDash";
import CustomerDash from "./components/Customer/CustomerDash";
import ProtectedRoute from "./ProtectedRoute";
import Cart from "./components/Cart";
import Profile from "./components/Profile";
import Users from "./components/Common/Users";
import Categories from "./components/Common/Categories";

function App() {
  return (
    <div className="App">
      {/* <ToastContainer /> */}
      <Helmet>
        <title>E-Commerce-Portal</title>
      </Helmet>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/create">
            <Register />
          </Route>
          <Route
            path="/update/:id"
            render={(props) => <Register id={props.match.params.id} />}
          />
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/admin/dashboard">
            <ProtectedRoute component={AdminDash} role="admin" />
          </Route>
          <Route path="/:any/users">
            <ProtectedRoute
              component={Users}
              role={(props) => props.match.params.role}
            />
          </Route>
          <Route path="/:any/categories">
            <ProtectedRoute
              component={Categories}
              role={(props) => props.match.params.role}
            />
          </Route>
          <Route path="/:any/profile">
            <ProtectedRoute
              component={Profile}
              role={(props) => props.match.params.role}
            />
          </Route>
          <Route path="/admin/add-user">
            <ProtectedRoute component={AdminDash} role="admin" />
          </Route>
          <Route path="/supplier/dashboard">
            <ProtectedRoute component={SupplierDash} role="supplier" />
          </Route>
          <Route path="/customer/dashboard">
            <ProtectedRoute component={CustomerDash} role="customer" />
          </Route>
          {/* <Route path="/home">
            <ProtectedRoute component={Home} role="customer" path="/home" />
          </Route> 
          <Route path="/profile">
            <ProtectedRoute></ProtectedRoute>
          </Route>
          <Route path="/cart">
            <ProtectedRoute
              component={Cart}
              role="customer"
              path="/home"
            ></ProtectedRoute>
          </Route>*/}
        </Switch>
      </Router>
      <ToastContainer
        autoClose={1500}
        hideProgressBar={true}
        position={toast.POSITION.TOP_RIGHT}
        newestOnTop={true}
        transition={Slide}
      />
    </div>
  );
}

export default App;
