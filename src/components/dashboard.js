import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
// import {fetchProtectedData} from '../actions/protected-data';
import {fetchWord, answerWord, resetProgress} from '../actions/word';
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
    this.props.dispatch(fetchWord());
  }

  validateAnswer(){
    if(this.state.localAns && this.props.word){
     
      const feedback = this.props.isCorrect ? 'Correct!' : 'Incorrect. Try another!' ;
    
      return(
        <div>
          <p>{feedback}</p>
          <p>This word translates to: {this.props.answer.join(' / ')}.</p>
          {this.props.isCorrect ? '' : 'Your answer was: ' + this.state.localAns}
          {this.nextButton()}
        </div>
      );
      
    }
    else {
      return(
        <div></div>
      );
    }
  }

  nextButton(){
    return(
      <div>
        <input
          onClick={() => {
            this.setState({localAns: null, toggleBox: false});
            this.props.dispatch(fetchWord());
          }}
          type='submit'
          className='nextWordButton'
          name='nextWordButton'
          value='Next'>
        </input>
      </div>
    );
  }

  resetButton(){
    return (
      <button onClick={()=>this.props.dispatch(resetProgress())}>
        Reset Progress
      </button>
    );
  }

  render() {
    const toggleInputBox = this.state.toggleBox ? 'none' : 'block';
    if(!this.props.loading){
      return (
        <div className="dashboard">
          <div className="dashboard-username">
                    Username: {this.props.username}
          </div>
          <div className="dashboard-name">Name: {this.props.name}</div>

          <h1>Your word is...</h1>
          <h2>{this.props.word.untranslated}</h2>
          <h3>({this.props.word.phonetic})</h3>
          <form 
            className='answerForm'
            style={{display: `${toggleInputBox}` }}
            onSubmit={e => {
              e.preventDefault();
              this.setState({
                localAns: e.target.answer.value,
                toggleBox: true
              });
              this.props.dispatch(answerWord(this.props.word.wordId, e.target.answer.value));
            }}>
            <input 
              type='text'
              id='answerBox'
              name='answer'
              placeholder='Enter in an answer'
            />
            <input 
              type='submit' 
              id='answerButton' 
              className='answerButton' 
              name='button' 
              value='Submit'
            />
          </form>
          {this.validateAnswer()}
          <br/>
          <br/>
          {this.resetButton()}
        </div>);
    }
    else if(this.props.loading === true){
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
  protectedData: state.protectedData.data,
  word: state.word.word,
  answer: state.word.answer,
  loading: state.word.loading,
  isCorrect: state.word.isCorrect,
});

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
