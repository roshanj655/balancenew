function Sidebar() {
    return (
<nav className="dark-bg sidebar sidebar-offcanvas" id="sidebar">
    <img className="logo" src="/assets/images/balance.png"></img>
  <ul className="nav">
    <li className="nav-item nav-profile">
      
        <button class="btn add-new-but"><i class="mdi mdi-plus"></i> Add New...</button>
      
    </li>
    <li className="nav-item">
      <a className="nav-link" href="index.html">
        <span className="menu-title">Home</span>
        <i className="mdi mdi-home menu-icon"></i>
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
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
      <a className="nav-link" href="pages/forms/basic_elements.html">
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
</nav>

);
}

export default Sidebar;