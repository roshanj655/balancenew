import React from "react";
import ReactDOM from "react-dom";
import MagicBell, { FloatingNotificationInbox } from "@magicbell/magicbell-react";

function Header(props) {
  const theme = {"icon":{"borderColor":"#a9a1a6","width":"20px","width":"20px"},"unseenBadge":{"backgroundColor":"#DF4759"},"header":{"backgroundColor":"#d2866d","textColor":"#ffffff","borderRadius":"16px"},"footer":{"backgroundColor":"#d2866d","textColor":"#ffffff","borderRadius":"16px"},"notification":{"default":{"textColor":"#15091F","borderRadius":"8px","backgroundColor":"#d2866d"},"unseen":{"backgroundColor":"#6113A3"},"unread":{"backgroundColor":"#6113A3"}}};

    return (
<nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">

        <div className="dark-bg text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-stretch">
        <ul className="navbar-nav">
            <li className="nav-item nav-profile dropdown">
              <a className="nav-link dropdown-toggle score-drop" id="" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                <div className="nav-profile-img">
                  <img src="assets/images/faces/user.jpeg" alt="image" />
                </div>
                <div className="nav-profile-text score-text">
                  <p className="mb-1 text-black">Your Balance Score</p>
                  <h4>{props.balanceScore?props.balanceScore.score:0}</h4>
                </div>
              </a>
            </li>
          </ul>
          <div className="search-field d-none d-md-block">
            <form className="d-flex align-items-center h-100" action="#">
              <div className="input-group">
                <div className="input-group-prepend bg-transparent">
                  <i className="input-group-text border-0 mdi mdi-magnify"></i>
                </div>
                <input type="text" className="form-control bg-transparent border-0" placeholder="Search projects" />
              </div>
            </form>
          </div>
          <ul className="navbar-nav navbar-nav-right">
            
            <li className="nav-item d-none d-lg-block full-screen-link">
              <a className="nav-link">
                {/* <i className="mdi mdi-fullscreen" id="fullscreen-button"></i> */}
              </a>
            </li>
            <li className="nav-item nav-settings d-none d-lg-block">
              <a className="nav-link" href="#">
                {/* <i className="mdi mdi-format-line-spacing"></i> */}
              </a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#" data-bs-toggle="dropdown">
                <MagicBell
                apiKey="8476498a6627f7e5c15a2507cbb299e54a170abc"
                userEmail={props.user.email}
                theme={theme}
                locale="en"
              >
                {(props) => <FloatingNotificationInbox width={400} height={500} {...props} />}
              </MagicBell>
              </a>
              
            </li>
            <li className="nav-item nav-profile dropdown">
              <a className="nav-link dropdown-toggle" id="profileDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                <div className="nav-profile-img">
                  <img src="assets/images/faces/user.jpeg" alt="image" />
                  <span className="availability-status online"></span>
                </div>
                <div className="nav-profile-text">
                  <p className="mb-1 text-black">{props.user.firstName}</p>
                </div>
              </a>
              <div className="dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown">
                {/* <a className="dropdown-item" href="#">
                  <i className="mdi mdi-cached me-2 text-success"></i> Activity Log </a> */}
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  <i className="mdi mdi-logout me-2 text-primary"></i> Signout </a>
              </div>
            </li>
          </ul>
          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
            <span className="mdi mdi-menu"></span>
          </button>
        </div>
      </nav>
    );
}

export default Header;