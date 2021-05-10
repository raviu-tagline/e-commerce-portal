import React from "react";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { Component } from "react";
import { faInbox, faMailBulk, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        name: userData[0].name,
        username: userData[0].email,
        role: userData[0].role,
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
            <a className="sidebar-brand">
              <p>
                <FontAwesomeIcon icon={faUser} /> {this.state.name}
              </p>
            </a>
            <a className="sidebar-brand">
              <p>
                <FontAwesomeIcon icon={faInbox} /> {this.state.username}
              </p>
            </a>
          </div>
          <ul className="nav sidebar-nav">
            {this.state.role == "admin" ? (
              <>
                <li>
                  <a href="#">
                    <span className="e-text"> Manage users</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="e-text"> Inbox 2</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="e-text"> Inbox 3</span>
                  </a>
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
