import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import LoginForm from './login-form';

import './style/landing-page.css';

export class LandingPage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isLoginShowing: false
    };
  }

  render(){
      // If we are logged in redirect straight to the user's dashboard
      
    if (this.loggedIn) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div className="home">
        <h2>Welcome to Babble Tower!</h2>
        <p>Ever wanted to learn a new language? Now you can! Babble Tower allows you to learn new languages with easy-to-use flashcard exercises! To get started, please login or register below!</p>
        {/* <LoginForm /> */}
        {/* <Link to="/register">Register</Link> */}
      </div>
    );
}

}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
