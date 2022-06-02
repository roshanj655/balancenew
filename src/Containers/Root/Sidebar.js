import React, { Component } from 'react'
import {
  TouchableOpacity
} from 'react-native-web'
import AddScreen from '../Add/AddScreen'
export default class Sidebar extends Component {
  constructor(props) {
    super(props)
    const today = new Date()
    this.state = {}
    this.state = {
      ShowAdd: false,
      selectedMenu: "dashboard"
    }
  }
  showHideAddScreen(data) {
    this.props.navdata.showHideScreen("dashboard")
    this.setState({ ShowAdd: data })
  }
  setMenu(data) {
    this.setState({ selectedMenu: data })
  }
  render() {
    const url = "http://zavius.in/balance/assets/images/";
    return (
      <nav className="dark-bg sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <img className="logo" alt="" src={url + "balance.png"} />
          <li className="nav-item nav-profile">
            <TouchableOpacity
              onPress={() => {
                this.setState({ ShowAdd: true })
              }}
            >
              <button className="btn add-new-but"><i className="mdi mdi-plus"></i> Add New...</button>
            </TouchableOpacity>

          </li>
          {/* <li className="nav-item">
            <a className="nav-link" href="index.html">
              <span className="menu-title">Home</span>
              <i className="mdi mdi-home menu-icon"></i>
            </a>
          </li> */}
          <li className={this.state.selectedMenu=="dashboard" ? "nav-item  activemenu" : "nav-item"}>
            <a className="nav-link" onClick={() => {
              this.props.navdata.showHideScreen(true)
              this.setMenu("dashboard")
            }
            }
              data-bs-toggle="collapse" href="#" aria-expanded="false" aria-controls="ui-basic">
                <img src={url + "deshboard-icon.png"} />
              <span className="menu-title">Dashboard</span>
              {/* <i className="mdi mdi-crosshairs-gps menu-icon"></i> */}
            </a>
          </li>
          <li className={this.state.selectedMenu == "med" ? "nav-item activemenu" : "nav-item"}>
            <a className="nav-link" onClick={() => {
              this.props.navdata.showHideScreen("med")
              this.setMenu("med")
            }
              }>
                <img src={url + "meditation-icon.png"} />
              <span className="menu-title">Medition</span>
              {/* <i className="mdi mdi-format-list-bulleted menu-icon"></i> */}
            </a>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link" onClick={() => this.props.navdata.showHideScreen("profile")} href="#">
              <span className="menu-title">Profile</span>
              <i className="mdi mdi-contacts menu-icon"></i>
            </a>
          </li> */}

        </ul>
        {this.state.ShowAdd ? (
          <div>
            <AddScreen data={{ showHideAddScreen: this.showHideAddScreen.bind(this) }} newDate={this.props.newDate} />
          </div>
        ) : ("")}

      </nav>

    );
  }
}