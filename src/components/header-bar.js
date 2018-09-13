import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import {Redirect} from 'react-router-dom';
import './style/header-bar.css';
import LoginForm from './login-form';

export class HeaderBar extends React.Component {
  // logOut() {
  //   this.props.dispatch(clearAuth());
  //   clearAuthToken();
  // }

  render() {
    // Only render the log out button if we are logged in
    
    let navButtons = this.props.loggedIn
      ? [ <a className='homeNav' href="/" key="home">Home</a>,
        <a className='learnNav' href='/learn' key="learn">Learn</a>]
      : <a className='homeNav' href="/">Home</a>;
    
    let loginLogout = this.props.loggedIn
      ? [ <span className="userName" key="name">{this.props.user.name} </span>,
        <a href="/logout" key="logout">Logout</a>]
      : <LoginForm />;

  
    return (
      <div className="header-bar">
        <div className='titleBox'>
          <h1 className='site-title'>--SITENAME--</h1>
        </div>

        <nav className='nav-box'>
          <div className="mainNav nav-box-element">
            {navButtons}
          </div>
          <div className="logNav nav-box-element">
            {loginLogout}
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  user: state.auth.currentUser
});

export default connect(mapStateToProps)(HeaderBar);
