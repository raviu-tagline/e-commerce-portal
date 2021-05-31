import React from "react";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { Component } from "react";
import {
  faInbox,
  faLayerGroup,
  faPlus,
  faTachometerAlt,
  faTags,
  faUser,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
export default class NavSidebar extends Component {
  constructor(props) {
    super(props);
    this.width = "260px";
    this.toggleClick = this.toggleClick.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.state = {
      username: null,
      name: null,
      role: null,
    };
  }
  toggleClick() {
    this.sidebarobj.toggle();
  }
  onCreate() {
    this.sidebarobj.element.style.visibility = "";
  }
  componentDidMount() {
    if (localStorage.getItem("user-info")) {
      const userData = JSON.parse(localStorage.getItem("user-info"));
      this.setState({
        name: userData.name,
        username: userData.email,
        role: userData.role,
      });
    }
  }
  render() {
    return (
      <>
        <SidebarComponent
          id="default-sidebar"
          ref={(Sidebar) => (this.sidebarobj = Sidebar)}
          style={{ visibility: "hidden" }}
          width={this.width}
          created={this.onCreate}
        >
          <div className="sidebar-header header-cover bg-light">
            <Link
              className="sidebar-brand"
              to={"/" + this.state.role + "/profile"}
            >
              <span>
                <FontAwesomeIcon icon={faUser} /> {this.state.name}
              </span>
            </Link>
            <Link
              className="sidebar-brand"
              to={"/" + this.state.role + "/profile"}
            >
              <span>
                <FontAwesomeIcon icon={faInbox} /> {this.state.username}
              </span>
            </Link>
          </div>
          <ul className="nav sidebar-nav">
            <li>
              <Link to={"/" + this.state.role + "/dashboard"}>
                <span className="e-text">
                  <FontAwesomeIcon icon={faTachometerAlt} />
                  <span className="ml-3">Dashboard</span>
                </span>
              </Link>
            </li>
            {this.state.role == "admin" ? (
              <>
                <li>
                  <Link to="/admin/add-user">
                    <span className="e-text">
                      <FontAwesomeIcon icon={faUserPlus} />
                      <span className="ml-3">Add User</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/users">
                    <span className="e-text">
                      <FontAwesomeIcon icon={faUsers} />
                      <span className="ml-3">View Users</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/add-category">
                    <span className="e-text">
                      <FontAwesomeIcon icon={faPlus} />
                      <span className="ml-3">Add Category</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/categories">
                    <span className="e-text">
                      <FontAwesomeIcon icon={faLayerGroup} />
                      <span className="ml-3">View Categories</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/add-sub-category">
                    <span className="e-text">
                      <FontAwesomeIcon icon={faPlus} />
                      <span className="ml-3">Add Sub Category</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/sub-categories">
                    <span className="e-text">
                      <FontAwesomeIcon icon={faTags} />
                      <span className="ml-3">View Sub Categories</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/add-product">
                    <span className="e-text">
                      <FontAwesomeIcon icon={faPlus} />
                      <span className="ml-3">Add Product</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/products">
                    <span className="e-text">
                      <FontAwesomeIcon icon={faTags} />
                      <span className="ml-3">View Products</span>
                    </span>
                  </Link>
                </li>
              </>
            ) : (
              ""
            )}
            {this.state.role == "supplier" ? (
              <>
                <li>
                  <a href="#">
                    <span className="e-text"> Inbox 4</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="e-text"> Inbox 5</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="e-text"> Inbox 6</span>
                  </a>
                </li>
              </>
            ) : (
              ""
            )}
            {this.state.role == "customer" ? (
              <>
                <li>
                  <a href="#">
                    <span className="e-text"> Inbox 7</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="e-text"> Inbox 8</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="e-text"> Inbox 9</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="e-text"> Inbox 10</span>
                  </a>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
        </SidebarComponent>
      </>
    );
  }
}
