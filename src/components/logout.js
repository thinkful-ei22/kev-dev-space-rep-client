import React from 'react';
import {connect} from 'react-redux';
import {
  logout
} from '../actions/auth';

export class Logout extends React.Component{
  componentWillMount(prevProps){
    this.props.dispatch(logout());
  }

  render(){
    const message = this.props.loggedIn
      ? <p>Logging out...</p>
      : <p>Logged out. Thank you for using Babble Tower!</p>;

    return(
      <div className="content-box">
        {message}
      </div>
    );

  }

  
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Logout);