import React from 'react';
import {connect} from 'react-redux';
import {
  logout
} from '../actions/auth';

export class Logout extends React.Component{
  componentWillMount(prevProps){
    this.props.dispatch(logout());
  }

  componentDidUpdate(prevProps){
    if(this.props.loggedIn || this.props.hasAuthToken)
      this.props.dispatch(logout());
  }
  
  render(){
    const message = this.props.loggedIn || this.props.hasAuthToken
      ? <p>Logging out...</p>
      : <p>Logged out. Thank you for using --SITENAME--!</p>;

    return(
      <div className="logoutBox" style={{background: 'white',
        /* border-top: 20px solid black; */
        maxWidth: '1200px',
        margin: 'auto'}}>
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

export default connect(mapStateToProps)(Logout);