import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
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
      ? [ <Link className='homeNav' to="/" key="home">Progress</Link>,
        <Link className='learnNav' to='/learn' key="learn">Learn</Link>]
      : <Link className='homeNav' to="/">Home</Link>;
    
    let loginLogout = this.props.loggedIn
      ? [ <span className="userName" key="name">{'Hello, ' + this.props.user.name} </span>,
        <Link to="/logout" key="logout">Logout</Link>]
      : <LoginForm />;

  
    return (
      <div className="header-bar">
        <div className='titleBox'>
          <h1 className='site-title'>Sakura Learning</h1>
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
