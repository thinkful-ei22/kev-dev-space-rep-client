import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import {Redirect} from 'react-router-dom';
import './style/header-bar.css';

export class HeaderBar extends React.Component {
  // logOut() {
  //   this.props.dispatch(clearAuth());
  //   clearAuthToken();
  // }

  render() {
    // Only render the log out button if we are logged in
    let logOutButton;
    let learnButton;
    let progressButton;
    if (this.props.loggedIn) {
      learnButton = (
        <a href="/learn">Learn</a>
      );
      progressButton = (
        <a href="/progress">Progress</a>
      );
      logOutButton = (
        <a href="/logout">Logout</a>
      );
    }
    return (
      <div className="header-bar">
        <div className='titleBox'>
          <h1 className='webTitle'>Babble Tower</h1>
        </div>
        <br/>
        <a 
          className='homeNav'
          href="/">Home</a>
        {/* {learnButton}
        {progressButton} */}
        {logOutButton}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
