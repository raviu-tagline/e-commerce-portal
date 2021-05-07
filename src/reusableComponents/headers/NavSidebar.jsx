import React from "react";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { Component } from "react";
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
            <div className="image-container">
              <div className="sidebar-image"></div>
            </div>
            <div style={{ padding: "0 0 5px 0" }}>
              <a className="sidebar-brand">
                {this.state.name} <br /> {this.state.username}
              </a>
            </div>
          </div>
          <ul className="nav sidebar-nav">
            {this.state.role == "admin" ? (
              <>
                <li>
                  <a href="#">
                    <span className="e-text"> Inbox 1</span>
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
