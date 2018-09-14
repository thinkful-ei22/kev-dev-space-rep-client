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
  
  populateTotal(){
    let correct = 0;
    let incorrect = 0;
    this.props.history.forEach(i =>{
      correct += i.correct;
      incorrect += i.incorrect;
    });

    const totalGuesses = correct + incorrect;
    const accuracy = totalGuesses > 0 ? correct/totalGuesses*100 + '%' : 'n/a';
    return (
      [
        <p key="total">Total Guesses: {totalGuesses}</p>,
        <p key="accuracy">Total Accuracy: {accuracy}</p>
      ]
    );
  }

  populateWords(){
    return this.props.history.map(i =>{
      console.log(i);
      const guessCount = i.correct + i.incorrect;
      return (<div className='word-progress-element'>
        <h3>{i.untranslated} - {i.phonetic}</h3>
        <p>Correct: {i.correct}</p> 
        <p>Incorrect: {i.incorrect}</p>
        <p>Accuracy: {
          guessCount > 0
            ? i.correct/guessCount*100 + '%'
            : 'n/a'
        }</p>
      </div>);
    });
  }

  render() {
    if(!this.props.loading){
      return (
        <div className='dashboard'>
          <div className='dashboard-content'>
            <h2>Progress</h2>
            <p>
              Welcome to the Progress Dashboard! You may track your progress here.
            </p>
            <div className="progress">
              <div className="total-progress">
                {this.populateTotal()}
              </div>
              <div className="word-progress">
                {this.populateWords()}
              </div>
            </div>  
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
