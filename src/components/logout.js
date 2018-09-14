import React from 'react';
import {connect} from 'react-redux';
import {
  logout
} from '../actions/auth';
import {withRouter} from 'react-router-dom';
import './style/logout.css';

export class Logout extends React.Component{
  componentWillMount(prevProps){
    this.props.dispatch(logout());
  }

  componentDidUpdate(prevProps){
    if(this.props.loggedIn || this.props.hasAuthToken)
      this.props.dispatch(logout());
  }

  setTimeoutLogout(){
    return(
      <div>
        
      </div>
    );

  }
  
  render(){
    let message = '';
    if(this.props.loggedIn || this.props.hasAuthToken){
      message = <p>Logging out...</p>;
    }
    else{
      message = <p>Logged out. Thank you for using Sakura Learning!</p>;
      window.setTimeout(() => this.props.history.push('/'), 3000);
    }
    return(
      <div className="logout-box">
        {message}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(Logout));