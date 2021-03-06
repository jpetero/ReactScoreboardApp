import React, { Component } from 'react';
import '../../assets/css/adminComponent.css';
import { Route, NavLink, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../redux/authentications/actions/logoutActions';
import AuthenticateUserFlashMessage from '../messages/AuthenticateUserFlashMessage';
import { UnauthorizedUserFlashMessage } from '../messages/UnauthorizedUserFlashMessage';
import EmployeeDetailsComponent from '../employees-management/EmployeeDetailsComponent';
import ScoreboardsListComponent from './ScoreboardsListComponent';
import EditScoreboardFlashMessage from '../messages/EditScoreboardFlashMessage';
import EditScoresComponent from './EditScoresComponent';
import NoMatch404 from '../layouts/NoMatch404';
import MyDetailsComponent from './MyDetailsComponent';
import SettingsComponent from './SetttingsComponent';
import ScoreboardDetailsComponent from '../scoreboards-management/ScoreboardDetailsComponent';
import OneYearDashboardComponent from './1YearDashboardComponent';
import OneMonthDashboardComponent from './1MonthDashboardComponent';
import ThreeMonthsDashboardComponent from './3MonthsDashboardComponent';
import SixMonthsDashboardComponent from './6MonthsDashboardComponent';
import CreateReportComponent from '../reports/CreateReportComponent';
import EditReportComponent from '../reports/EditReportComponent';
import ReportsListComponent from '../reports/ReportsListComponent';

export class EmployeeComponent extends Component {
  logout = e => {
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/login');
  };
  render() {
    const {
      isAuthenticated,
      authenticateUser
    } = this.props.authenticateUserData;

    const user = authenticateUser ? authenticateUser.userInformation : null;

    return (
      <div id="admin-component">
        {/* <!-- Bootstrap NavBar --> */}
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          {/* Toggle button */}
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* 3D Branding */}
          <NavLink
            activeClassName="active"
            className="navbar-brand"
            to="/employee"
          >
            3D Services
          </NavLink>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mr-3">
                <a
                  href="#!"
                  className="nav-link"
                  style={{ cursor: 'pointer' }}
                  onClick={this.logout}
                >
                  Logout{' '}
                  {isAuthenticated
                    ? authenticateUser.userInformation.email
                    : ''}
                </a>
              </li>
              {/* <!-- This menu is hidden in bigger devices with d-sm-none.  */}
              {/* The sidebar isn't proper for smaller screens imo, so this dropdown menu can keep all the useful sidebar itens exclusively for smaller screens  --> */}

              {/* PROFILE */}
              <li className="nav-item dropdown d-sm-block d-md-none">
                <a
                  className="nav-link dropdown-toggle"
                  href="#!"
                  id="smallerscreenmenu"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Profile
                </a>
                {/* Drop down menu */}
                <div
                  className="dropdown-menu text-center bg-dark"
                  aria-labelledby="smallerscreenmenu"
                >
                  <NavLink
                    className="dropdown-item bg-dark text-white"
                    to="/employee/settings"
                  >
                    Settings
                  </NavLink>
                  <NavLink
                    className="dropdown-item bg-dark text-white"
                    to="/employee/my-details"
                  >
                    My Details
                  </NavLink>
                  <NavLink
                    className="dropdown-item bg-dark text-white"
                    to={`/employee/all-scoreboards/${user.id}`}
                  >
                    My Scoreboards
                  </NavLink>
                </div>
              </li>

              {/* Dashboard */}
              <li className="nav-item dropdown d-sm-block d-md-none">
                <a
                  className="nav-link dropdown-toggle"
                  href="#!"
                  id="smallerscreenmenu"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Dashboards
                </a>
                {/* Drop down menu */}
                <div
                  className="dropdown-menu text-center bg-dark"
                  aria-labelledby="smallerscreenmenu"
                >
                  <NavLink
                    className="dropdown-item bg-dark text-white"
                    to="/employee/1month"
                  >
                    This Months's Scoreboard
                  </NavLink>
                  <NavLink
                    className="dropdown-item bg-dark text-white"
                    to="/employee/3months"
                  >
                    Last Three Months
                  </NavLink>
                  <NavLink
                    className="dropdown-item bg-dark text-white"
                    to="/employee/6months"
                  >
                    Last Six Months
                  </NavLink>
                  <NavLink
                    className="dropdown-item bg-dark text-white"
                    to="/employee/1year"
                  >
                    This Year
                  </NavLink>
                </div>
              </li>
              {/* KPIs */}
              <li className="nav-item dropdown d-sm-block d-md-none">
                <a
                  className="nav-link dropdown-toggle"
                  href="#!"
                  id="smallerscreenmenu"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  KPIs
                </a>
                {/* Drop down menu */}
                <div
                  className="dropdown-menu text-center bg-dark"
                  aria-labelledby="smallerscreenmenu"
                >
                  <NavLink
                    className="dropdown-item bg-dark text-white"
                    to={`/employee/kpis/${user.id}`}
                  >
                    My KPIs
                  </NavLink>
                </div>
              </li>

              {/* SCOREBOARDS */}
              <li className="nav-item dropdown d-sm-block d-md-none">
                <a
                  className="nav-link dropdown-toggle"
                  href="#!"
                  id="smallerscreenmenu"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Scoreboards
                </a>
                <div
                  className="dropdown-menu text-center bg-dark"
                  aria-labelledby="smallerscreenmenu"
                >
                  <NavLink
                    className="dropdown-item bg-dark text-white"
                    to={`/employee/all-scoreboards/${user.id}`}
                  >
                    My Scoreboards
                  </NavLink>
                </div>
              </li>
              {/* <!-- Smaller devices menu END --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- NavBar END --> */}

        {/* <!-- Bootstrap row --> */}
        <div className="row" id="body-row">
          {/* <!-- Sidebar --> */}
          <div
            id="sidebar-container"
            className="sidebar-expanded d-none d-md-block"
          >
            {/* <!-- d-* hiddens the Sidebar in smaller devices. Its items can be kept on the Navbar 'Menu' --> */}
            {/* <!-- Bootstrap List Group --> */}
            <ul className="list-group">
              {/* <!-- Separator with title --> */}
              <li className="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
                <small>MAIN MENU</small>
              </li>

              {/* <!-- Menu with submenu --> */}
              <a
                href="#submenu2"
                data-toggle="collapse"
                aria-expanded="false"
                className="bg-dark list-group-item list-group-item-action flex-column align-items-start"
              >
                <div className="d-flex w-100 justify-content-start align-items-center">
                  <span className="fa fa-user fa-fw mr-3"></span>
                  <span className="menu-collapsed">Profile</span>
                  <span className="submenu-icon ml-auto"></span>
                </div>
              </a>
              {/* <!-- Submenu content --> */}
              <div id="submenu2" className="collapse sidebar-submenu">
                <NavLink
                  to="/employee/settings"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">Settings</span>
                </NavLink>
                <NavLink
                  to="/employee/my-details"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">My Details</span>
                </NavLink>
                <NavLink
                  to={`/employee/all-scoreboards/${user.id}`}
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">My Scoreboards</span>
                </NavLink>
              </div>
              <a
                href="#submenu1"
                data-toggle="collapse"
                aria-expanded="false"
                className="bg-dark list-group-item list-group-item-action flex-column align-items-start"
              >
                <div className="d-flex w-100 justify-content-start align-items-center">
                  <span className="fa fa-dashboard fa-fw mr-3"></span>
                  <span className="menu-collapsed">Dashboards</span>
                  <span className="submenu-icon ml-auto"></span>
                </div>
              </a>
              {/* <!-- Submenu content --> */}
              <div id="submenu1" className="collapse sidebar-submenu">
                <NavLink
                  to="/employee/1month"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">
                    This Month's Scoreboards
                  </span>
                </NavLink>
                <NavLink
                  to="/employee/3months"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">Last Three Months</span>
                </NavLink>
                <NavLink
                  to="/employee/6months"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">Last Six Months</span>
                </NavLink>
                <NavLink
                  to="/employee/1year"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">This Year</span>
                </NavLink>
              </div>

              {/* <!-- Separator with title --> */}
              <li className="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
                <small>OPTIONS</small>
              </li>

              {/* KPIs Menu */}
              <a
                href="#kpis-submenu"
                data-toggle="collapse"
                aria-expanded="false"
                className="bg-dark list-group-item list-group-item-action flex-column align-items-start"
              >
                <div className="d-flex w-100 justify-content-start align-items-center">
                  <span className="fa fa-dashboard fa-fw mr-3"></span>
                  <span className="menu-collapsed">KPIs</span>
                  <span className="submenu-icon ml-auto"></span>
                </div>
              </a>
              {/* <!-- Employees Submenu --> */}
              <div id="kpis-submenu" className="collapse sidebar-submenu">
                <NavLink
                  to={`/employee/kpis/${user.id}`}
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">My KPIs</span>
                </NavLink>
              </div>

              {/* Scoreboards Menu */}
              <a
                href="#scoreboards-submenu"
                data-toggle="collapse"
                aria-expanded="false"
                className="bg-dark list-group-item list-group-item-action flex-column align-items-start"
              >
                <div className="d-flex w-100 justify-content-start align-items-center">
                  <span className="fa fa-dashboard fa-fw mr-3"></span>
                  <span className="menu-collapsed">Scoreboards</span>
                  <span className="submenu-icon ml-auto"></span>
                </div>
              </a>
              {/* <!-- Employees Submenu --> */}
              <div
                id="scoreboards-submenu"
                className="collapse sidebar-submenu"
              >
                <NavLink
                  to={`/employee/all-scoreboards/${user.id}`}
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">My Scoreboards</span>
                </NavLink>
              </div>

              {/* <!-- Separator without title --> */}
              <li className="list-group-item sidebar-separator menu-collapsed"></li>
              {/* <!-- /END Separator --> */}
              <NavLink
                to="/employee/help"
                className="bg-dark list-group-item list-group-item-action"
              >
                <div className="d-flex w-100 justify-content-start align-items-center">
                  <span className="fa fa-question fa-fw mr-3"></span>
                  <span className="menu-collapsed">Help</span>
                </div>
              </NavLink>
            </ul>
            {/* List Group END */}
          </div>
          {/* sidebar-container END */}

          {/* MAIN COLUMN, Insert all your dynamic data here */}
          <div className="col">
            <AuthenticateUserFlashMessage />
            <UnauthorizedUserFlashMessage />
            <EditScoreboardFlashMessage />
            <Switch>
              <Route
                exact
                path="/employee"
                component={OneMonthDashboardComponent}
              />
              <Route
                path={'/employee/details/:id'}
                component={EmployeeDetailsComponent}
              />

              <Route
                path={'/employee/all-scoreboards/:id'}
                component={ScoreboardsListComponent}
              />

              <Route
                path={'/employee/kpis/:id'}
                component={ScoreboardDetailsComponent}
              />

              <Route
                path={'/employee/my-details'}
                component={MyDetailsComponent}
              />
              <Route
                path={'/employee/settings'}
                component={SettingsComponent}
              />

              <Route
                path={'/employee/edit-scores/:id'}
                component={EditScoresComponent}
              />

              {/*Department employees performance for 1 month*/}
              <Route
                path={'/employee/1month'}
                component={OneMonthDashboardComponent}
              />

              {/*Department employees performance for 1 year*/}
              <Route
                path={'/employee/1year'}
                component={OneYearDashboardComponent}
              />

              {/*Department employees performance for 3 months*/}
              <Route
                path={'/employee/3months'}
                component={ThreeMonthsDashboardComponent}
              />

              {/*Department employees performance for 6 months*/}
              <Route
                path={'/employee/6months'}
                component={SixMonthsDashboardComponent}
              />

              {/* Scoreboard Report section */}
              <Route
                path={'/employee/upload-report/:id'}
                component={CreateReportComponent}
              />

              {/* Show all the reports created for the scoreboard */}
              <Route
                path={'/employee/reports/:id'}
                component={ReportsListComponent}
              />

              <Route
                path={'/employee/edit-report/:id'}
                component={EditReportComponent}
              />

              <Route component={NoMatch404} />
            </Switch>
          </div>
          {/* Main Col END  */}
        </div>
        {/* body-row END */}
      </div>
    );
  }
}

export default connect(
  state => {
    return { authenticateUserData: state.authenticateUserReducer };
  },
  { logout }
)(EmployeeComponent);
