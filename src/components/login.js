import React from 'react';
import {connect} from 'react-redux';
import {
  logout
} from '../actions/auth';

export function Login(props){
  
  return (
    <p>Hi! My name is- what? My name is- huh? ...hi!</p>

  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Login);