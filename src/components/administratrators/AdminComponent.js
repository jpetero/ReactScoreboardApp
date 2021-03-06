import React, { Component } from 'react';
import '../../assets/css/adminComponent.css';
import { Route, NavLink, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../redux/authentications/actions/logoutActions';
import AuthenticateUserFlashMessage from '../messages/AuthenticateUserFlashMessage';
import { UnauthorizedUserFlashMessage } from '../messages/UnauthorizedUserFlashMessage';
import EmployeesListComponent from '../employees-management/EmployeesListComponent';
import EmployeeDetailsComponent from '../employees-management/EmployeeDetailsComponent';
import CreateEmployeeComponent from '../employees-management/CreateEmployeeComponent';
import CreateUserFlashMessagesList from '../messages/CreateUserFlashMessagesList';
import CreateKPIComponent from '../kpis-management/CreateKPIComponent';
import CreateKPIFlashMessagesList from '../messages/CreateKPIFlashMessagesList';
import KPIsListComponent from '../kpis-management/KPIsListComponent';
import ScoreboardsListComponent from '../scoreboards-management/ScoreboardsListComponent';
import CreateScoreboardFlashMessage from '../messages/CreateScoreboardFlashMessage';
import AllScoreboardsComponent from '../scoreboards-management/AllScoreboardsComponent';
import EditScoreboardComponent from '../scoreboards-management/EditScoreboardComponent';
import EditScoreboardFlashMessage from '../messages/EditScoreboardFlashMessage';
import EditScoresComponent from '../scoreboards-management/EditScoresComponent';
import NoMatch404 from '../layouts/NoMatch404';
import EditEmployeeComponent from '../employees-management/EditEmployeeComponent';
import ScoreboardDetailsComponent from '../scoreboards-management/ScoreboardDetailsComponent';
import CreateScoreboardLayoutComponent from '../scoreboards-management/CreateScoreboardLayout';
import SearchEmployeeComponent from '../employees/SearchEmployeeComponent';
import CreateScoreboardEmployeesList from '../employees-management/CreateScoreboardEmployeesList';
import EditKPIComponent from '../kpis-management/EditKPIComponent';
import JobtitlesListComponent from '../jobtitles/JobtitlesListComponent';
import CreateJobtitleComponent from '../jobtitles/CreateJobtitleComponent';
import EditJobtitleComponent from '../jobtitles/EditJobtitleComponent';
import DepartmentsListComponent from '../departments/DepartmentsListComponent';
import CreateDepartmentComponent from '../departments/CreateDepartmentComponent';
import EditDepartmentComponent from '../departments/EditDepartmentComponent';
import MyDetailsComponent from './MyDetailsComponent';
import SettingsComponent from './SetttingsComponent';
import OneMonthDashboardComponent from './1MonthDashboardComponent';
import OneYearDashboardComponent from './1YearDashboardComponent';
import ThreeMonthsDashboardComponent from './3MonthsDashboardComponent';
import SixMonthsDashboardComponent from './6MonthsDashboardComponent';
import ReportsListComponent from '../reports/ReportsListComponent';
import EditReportComponent from '../reports/EditReportComponent';
import CreateReportComponent from '../reports/CreateReportComponent';

export class AdminComponent extends Component {
  logout = (e) => {
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/login');
  };
  render() {
    const {
      isAuthenticated,
      authenticateUser,
    } = this.props.authenticateUserData;

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
            to="/admin"
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
                    to="/admin/settings"
                  >
                    Settings
                  </NavLink>
                  <NavLink
                    className="dropdown-item bg-dark text-white"
                    to="/admin/my-details"
                  >
                    My Details
                  </NavLink>
                  <NavLink
                    className="dropdown-item bg-dark text-white"
                    to={`/admin/all-scoreboards/${
                      isAuthenticated ? authenticateUser.userInformation.id : ''
                    }`}
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
                    to="/admin/1month"
                  >
                    This Months's Scoreboard
                  </NavLink>
                  <NavLink
                    className="dropdown-item bg-dark text-white"
                    to="/admin/3months"
                  >
                    Last Three Months
                  </NavLink>
                  <NavLink
                    className="dropdown-item bg-dark text-white"
                    to="/admin/6months"
                  >
                    Last Six Months
                  </NavLink>
                  <NavLink
                    className="dropdown-item bg-dark text-white"
                    to="/admin/1year"
                  >
                    This Year
                  </NavLink>
                </div>
              </li>
              {/* Employees */}
              <li className="nav-item dropdown d-sm-block d-md-none">
                <a
                  className="nav-link dropdown-toggle"
                  href="#!"
                  id="smallerscreenmenu"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Employees
                </a>
                {/* Drop down menu */}
                <div
                  className="dropdown-menu text-center bg-dark"
                  aria-labelledby="smallerscreenmenu"
                >
                  <NavLink
                    className="dropdown-item bg-dark text-white"
                    to="/admin/all-employees"
                  >
                    All Employees
                  </NavLink>
                  <NavLink
                    className="dropdown-item bg-dark text-white"
                    to="/admin/create-employee"
                  >
                    Create Employee
                  </NavLink>
                </div>
              </li>
              {/* Job titles */}
              <li className="nav-item dropdown d-sm-block d-md-none">
                <a
                  className="nav-link dropdown-toggle"
                  href="#!"
                  id="smallerscreenmenu"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Job Titles
                </a>
                {/* Drop down menu */}
                <div
                  className="dropdown-menu text-center bg-dark"
                  aria-labelledby="smallerscreenmenu"
                >
                  <NavLink
                    className="dropdown-item bg-dark text-white"
                    to="/admin/all-jobtitles"
                  >
                    All Job Titles
                  </NavLink>
                  <NavLink
                    className="dropdown-item bg-dark text-white"
                    to="/admin/create-jobtitle"
                  >
                    Create Job Title
                  </NavLink>
                </div>
              </li>

              {/* DEPARTMENTS */}
              <li className="nav-item dropdown d-sm-block d-md-none">
                <a
                  className="nav-link dropdown-toggle"
                  href="#!"
                  id="smallerscreenmenu"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Departments
                </a>
                {/* Drop down menu */}
                <div
                  className="dropdown-menu text-center bg-dark"
                  aria-labelledby="smallerscreenmenu"
                >
                  <NavLink
                    className="dropdown-item bg-dark text-white"
                    to="/admin/all-departments"
                  >
                    All Departments
                  </NavLink>
                  <NavLink
                    className="dropdown-item bg-dark text-white"
                    to="/admin/create-department"
                  >
                    Create Department
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
                    to="/admin/all-kpis"
                  >
                    All KPIs
                  </NavLink>
                  <NavLink
                    className="dropdown-item bg-dark text-white"
                    to="/admin/create-kpi"
                  >
                    Create KPI
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
                    to="/admin/all-scoreboards"
                  >
                    Search Employee
                  </NavLink>
                  <NavLink
                    className="dropdown-item bg-dark text-white"
                    to="/admin/create-scoreboards"
                  >
                    Create Scoreboard
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

              {/* PROFILE */}
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
                  to="/admin/settings"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">Settings</span>
                </NavLink>
                <NavLink
                  to="/admin/my-details"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">My Details</span>
                </NavLink>
                <NavLink
                  to={`/admin/all-scoreboards/${
                    isAuthenticated ? authenticateUser.userInformation.id : ''
                  }`}
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">My Scoreboards</span>
                </NavLink>
              </div>

              {/* DASHBOARD*/}
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
                  to="/admin/1month"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">
                    This Month's Scoreboards
                  </span>
                </NavLink>
                <NavLink
                  to="/admin/3months"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">Last Three Months</span>
                </NavLink>
                <NavLink
                  to="/admin/6months"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">Last Six Months</span>
                </NavLink>
                <NavLink
                  to="/admin/1year"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">This Year</span>
                </NavLink>
              </div>

              {/* <!-- Separator with title --> */}
              <li className="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
                <small>OPTIONS</small>
              </li>
              {/* <!-- /END Separator --> */}
              {/* <!-- Menu with submenu --> */}
              {/* Employees Menu */}
              <a
                href="#employees-submenu"
                data-toggle="collapse"
                aria-expanded="false"
                className="bg-dark list-group-item list-group-item-action flex-column align-items-start"
              >
                <div className="d-flex w-100 justify-content-start align-items-center">
                  <span className="fa fa-dashboard fa-fw mr-3"></span>
                  <span className="menu-collapsed">Employees</span>
                  <span className="submenu-icon ml-auto"></span>
                </div>
              </a>
              {/* <!-- Employees Submenu --> */}
              <div id="employees-submenu" className="collapse sidebar-submenu">
                <NavLink
                  to="/admin/all-employees"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">All Employees</span>
                </NavLink>
                <NavLink
                  to="/admin/create-employee"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">Create Employee</span>
                </NavLink>
              </div>

              {/* Job title Menu */}
              <a
                href="#jobtitles-submenu"
                data-toggle="collapse"
                aria-expanded="false"
                className="bg-dark list-group-item list-group-item-action flex-column align-items-start"
              >
                <div className="d-flex w-100 justify-content-start align-items-center">
                  <span className="fa fa-dashboard fa-fw mr-3"></span>
                  <span className="menu-collapsed">Job Titles</span>
                  <span className="submenu-icon ml-auto"></span>
                </div>
              </a>
              {/* <!-- job titles Submenu --> */}
              <div id="jobtitles-submenu" className="collapse sidebar-submenu">
                <NavLink
                  to="/admin/all-jobtitles"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">All Job Titles</span>
                </NavLink>
                <NavLink
                  to="/admin/create-jobtitle"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">Create Job Title</span>
                </NavLink>
              </div>

              {/* Department menu */}
              <a
                href="#departments-submenu"
                data-toggle="collapse"
                aria-expanded="false"
                className="bg-dark list-group-item list-group-item-action flex-column align-items-start"
              >
                <div className="d-flex w-100 justify-content-start align-items-center">
                  <span className="fa fa-dashboard fa-fw mr-3"></span>
                  <span className="menu-collapsed">Departments</span>
                  <span className="submenu-icon ml-auto"></span>
                </div>
              </a>
              {/* <!-- Department Submenu --> */}
              <div
                id="departments-submenu"
                className="collapse sidebar-submenu"
              >
                <NavLink
                  to="/admin/all-departments"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">All Departments</span>
                </NavLink>
                <NavLink
                  to="/admin/create-department"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">Create Department</span>
                </NavLink>
              </div>

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
              {/* <!-- KPIs Submenu --> */}
              <div id="kpis-submenu" className="collapse sidebar-submenu">
                <NavLink
                  to="/admin/all-kpis"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">All KPIs</span>
                </NavLink>
                <NavLink
                  to="/admin/create-kpi"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">Create KPI</span>
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
                  to="/admin/all-scoreboards"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">Search Employee</span>
                </NavLink>
                <NavLink
                  to="/admin/create-scoreboards"
                  className="list-group-item list-group-item-action bg-dark text-white"
                >
                  <span className="menu-collapsed">Create Scoreboards</span>
                </NavLink>
              </div>

              {/* <!-- Separator without title --> */}
              <li className="list-group-item sidebar-separator menu-collapsed"></li>
              {/* <!-- /END Separator --> */}
              <NavLink
                to="/admin/help"
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
            <CreateUserFlashMessagesList />
            <CreateKPIFlashMessagesList />
            <CreateScoreboardFlashMessage />
            <EditScoreboardFlashMessage />
            <Switch>
              <Route
                exact
                path="/admin"
                component={OneMonthDashboardComponent}
              />
              <Route
                exact
                path={'/admin/all-employees'}
                component={EmployeesListComponent}
              />

              <Route
                path={'/admin/create-employee'}
                component={CreateEmployeeComponent}
              />

              <Route
                path={'/admin/edit-employee/:id'}
                component={EditEmployeeComponent}
              />

              <Route path={'/admin/all-kpis'} component={KPIsListComponent} />
              <Route
                path={'/admin/all-jobtitles'}
                component={JobtitlesListComponent}
              />
              <Route
                path={'/admin/all-departments'}
                component={DepartmentsListComponent}
              />

              <Route
                path={'/admin/all-employees/:id'}
                component={EmployeeDetailsComponent}
              />

              <Route
                path={`${this.props.match.url}/all-employees/:id`}
                component={EmployeeDetailsComponent}
              />

              <Route path="/admin/create-kpi" component={CreateKPIComponent} />
              <Route
                path="/admin/create-jobtitle"
                component={CreateJobtitleComponent}
              />
              <Route
                path="/admin/create-department"
                component={CreateDepartmentComponent}
              />

              <Route
                path={'/admin/all-scoreboards/:id'}
                component={ScoreboardsListComponent}
              />

              <Route
                path={'/admin/scoreboardlayout/:id'}
                component={ScoreboardDetailsComponent}
              />

              <Route
                path={'/admin/all-scoreboards'}
                component={AllScoreboardsComponent}
              />

              <Route
                path={'/admin/create-scoreboards'}
                component={CreateScoreboardEmployeesList}
              />

              <Route
                path={'/admin/create-scoreboardlayout/:id'}
                component={CreateScoreboardLayoutComponent}
              />

              <Route
                path={'/admin/edit-scoreboard/:id'}
                component={EditScoreboardComponent}
              />

              <Route
                path={'/admin/edit-kpi/:id'}
                component={EditKPIComponent}
              />

              <Route
                path={'/admin/edit-department/:id'}
                component={EditDepartmentComponent}
              />

              <Route
                path={'/admin/edit-jobtitle/:id'}
                component={EditJobtitleComponent}
              />

              <Route path={'/admin/settings'} component={SettingsComponent} />

              <Route
                path={'/admin/search-employee'}
                component={SearchEmployeeComponent}
              />

              {/* Information Regarding me */}
              <Route
                path={'/admin/my-details'}
                component={MyDetailsComponent}
              />

              {/*Department employees performance for 1 month*/}
              <Route
                path={'/admin/1month'}
                component={OneMonthDashboardComponent}
              />

              {/* Show all the reports created for the scoreboard */}
              <Route
                path={'/admin/reports/:id'}
                component={ReportsListComponent}
              />

              {/*Department employees performance for 1 year*/}
              <Route
                path={'/admin/1year'}
                component={OneYearDashboardComponent}
              />

              {/*Department employees performance for 3 months*/}
              <Route
                path={'/admin/3months'}
                component={ThreeMonthsDashboardComponent}
              />

              {/*Department employees performance for 6 months*/}
              <Route
                path={'/admin/6months'}
                component={SixMonthsDashboardComponent}
              />

              {/* Edit report */}
              <Route
                path={'/admin/edit-report/:id'}
                component={EditReportComponent}
              />
              {/* Scoreboard Report section */}
              <Route
                path={'/admin/upload-report/:id'}
                component={CreateReportComponent}
              />

              <Route
                path={'/admin/edit-scores/:id'}
                component={EditScoresComponent}
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
  (state) => {
    return { authenticateUserData: state.authenticateUserReducer };
  },
  { logout }
)(AdminComponent);
