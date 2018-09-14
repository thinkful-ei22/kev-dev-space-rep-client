import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
// import {fetchProtectedData} from '../actions/protected-data';
import {fetchProgress} from '../actions/users';
import './style/dashboard.css';

export class Dashboard extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchProgress());
  }
  
  populate(){
    return this.props.history.map(i =>{
      console.log(i);
      return (<div className='flex-right-dash'>
        <h3>{i.untranslated} - {i.phonetic}</h3>
        <p>Number of times correct: {i.correct} and incorrect {i.incorrect}.</p>
      </div>);
    });
  }

  render() {
    if(!this.props.loading){
      return (
        <div className='dashboard'>
          <div className='flex-left-dash'>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Morbi rhoncus orci id sem varius, sit amet pulvinar magna 
              vehicula. Nunc in molestie nisi, non euismod nibh. Nullam 
              gravida ex sed congue euismod. Integer ante ex, eleifend 
              sit amet consectetur vitae, aliquam porta sem. Curabitur 
              ultrices vehicula quam, ac luctus libero tincidunt ut. 
              Aliquam aliquet mollis felis, volutpat euismod dolor.
            </p>
          </div>
          <div className='flex-right-dash'>
            {this.populate()}
          </div>
        </div>
      );
    }
    else{
      return(
        <div className='dashboard'>
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
