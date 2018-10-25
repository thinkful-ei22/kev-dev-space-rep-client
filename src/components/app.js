import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter, Switch} from 'react-router-dom';

import HeaderBar from './header-bar';
import LandingPage from './landing-page';
import Dashboard from './dashboard';
import RegistrationPage from './registration-page';
import Learn from './learn';
import Logout from './logout';
import {refreshAuthToken} from '../actions/auth';

import './style/app.css';

export class App extends React.Component {
  componentDidUpdate(prevProps) {
    const currRoute = this.props.location.pathname;
    if (!prevProps.loggedIn && this.props.loggedIn && currRoute !== '/logout') {
      // When we are logged in, refresh the auth token periodically
      this.startPeriodicRefresh();
    } else if ((prevProps.loggedIn && !this.props.loggedIn) || currRoute === '/logout') {
      // Stop refreshing when we log out
      this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000 // One hour
    );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }

    clearInterval(this.refreshInterval);
  }

  render() {
    const shrink = 
      this.props.location.pathname === '/learn'
        ? 'app-content-shrink'
        : '';
    return (
      <div className="app">
        <HeaderBar />
        <div className={`app-content ${shrink}`}>
          <div className="app-content-box">
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/learn" component={Learn} />
              <Route exact path="/register" component={RegistrationPage} />
              <Route exact path="/logout" component={Logout} />
            </Switch>
          </div>  
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));
