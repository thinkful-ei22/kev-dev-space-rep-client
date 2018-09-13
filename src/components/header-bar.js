import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import {Redirect} from 'react-router-dom';
import './style/header-bar.css';
import LoginForm from './login-form'

export class HeaderBar extends React.Component {
  // logOut() {
  //   this.props.dispatch(clearAuth());
  //   clearAuthToken();
  // }

  render() {
    // Only render the log out button if we are logged in
    
    let navButtons = this.props.loggedIn
      ? [<a className='homeNav' href="/">Home</a>, <a className='learnNav' href='/learn'>Learn</a>]
      : <a className='homeNav' href="/">Home</a>;
    
    let loginLogout = this.props.loggedIn
      ? <a href="/logout">Logout</a>
      : <LoginForm />;

    


    return (
      <div className="header-bar">
        <div className='titleBox'>
          <h1 className='webTitle'>--SITENAME--</h1>
        </div>
        <br/>
        <div className="mainNav">
          {navButtons}
        </div>
        <div className="logNav">
          {loginLogout}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
