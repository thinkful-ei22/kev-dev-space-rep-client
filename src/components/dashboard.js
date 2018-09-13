import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
// import {fetchProtectedData} from '../actions/protected-data';
import {fetchProgress} from '../actions/users';
import './style/dashboard.css';

export class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      localAns: null,
      toggleBox: false
    };
  }

  componentWillMount() {
    this.props.dispatch(fetchProgress());
  }


  render() {
    const toggleInputBox = this.state.toggleBox ? 'none' : 'block';
    if(!this.props.loading){
      return (
        <p>Loaded!</p>
      );
    }
    else{
      return(
        <div>
          <p>LOADING....</p>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  username: state.auth.currentUser.username,
  name: state.auth.currentUser.name,
  loading: state.user.isLoading,
  history: state.user.history
});

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
