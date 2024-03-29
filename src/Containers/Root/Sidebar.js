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
      ShowAdd: false
    }
  }
  render(){
    return (
<nav className="dark-bg sidebar sidebar-offcanvas" id="sidebar">
  <ul className="nav">
    <img className="logo" alt="" src="/assets/images/balance.png" />
    <li className="nav-item nav-profile">
    <TouchableOpacity
                  onPress={() => {
                    this.setState({ ShowAdd: true })
                  }}
                >
        <button className="btn add-new-but"><i className="mdi mdi-plus"></i> Add New...</button>
      </TouchableOpacity>
      
    </li>
    <li className="nav-item">
      <a className="nav-link" href="index.html">
        <span className="menu-title">Home</span>
        <i className="mdi mdi-home menu-icon"></i>
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link" data-bs-toggle="collapse" href="/" aria-expanded="false" aria-controls="ui-basic">
        <span className="menu-title">Dashboard</span>
        <i className="menu-arrow"></i>
        <i className="mdi mdi-crosshairs-gps menu-icon"></i>
      </a>
      <div className="collapse" id="ui-basic">
        <ul className="nav flex-column sub-menu">
          <li className="nav-item"> <a className="nav-link" href="pages/ui-features/buttons.html">Buttons</a></li>
          <li className="nav-item"> <a className="nav-link" href="pages/ui-features/typography.html">Typography</a></li>
        </ul>
      </div>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/med">
        <span className="menu-title">Medition</span>
        <i className="mdi mdi-format-list-bulleted menu-icon"></i>
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="pages/icons/mdi.html">
        <span className="menu-title">Profile</span>
        <i className="mdi mdi-contacts menu-icon"></i>
      </a>
    </li>

  </ul>
  {this.state.ShowAdd?(
     <div>
  <AddScreen />
 </div>
  ):("")}
  
</nav>

);
}
}