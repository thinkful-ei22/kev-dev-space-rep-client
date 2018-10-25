import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
// import {fetchProtectedData} from '../actions/protected-data';
import {fetchWord, answerWord} from '../actions/word';
import './style/learn.css';

export class Learn extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      localAns: null,
      toggleBox: false,
      loadedOnce: false
    };
  }

  componentWillMount() {
    this.props.dispatch(fetchWord());
  }

  componentDidMount(){
    // this.setState({loadedOnce: true});
  }

  validateAnswer(){
    if(this.state.localAns && this.props.word){
     
      const responseClass = this.props.isCorrect ? 'correct' : 'incorrect';
      const feedback = this.props.isCorrect ? 'Correct!' : 'Incorrect. Try another!' ;
      return(
        <div className="feedback" aria-live="polite" aria-atomic="true">
          <p className={`answer ${responseClass}`}>{feedback}</p>
          <p>This word translates to: {this.props.word.translation.join(' / ')}.</p>
          {this.props.isCorrect ? '' : 'Your answer was: ' + this.state.localAns}
          <br/>
          {this.nextButton()}
        </div>
      );
      
    }
    else {
      return(
        <div className="feedback" aria-live="polite" aria-atomic="true"></div>
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

  render() {
    const toggleInputBox = this.state.toggleBox ? 'none' : 'block';
    const display = this.props.loading;
    
    if(this.props.loading){
      return (
        <section className="loading" >
          <p>LOADING....</p>
        </section>
      );
    }
    
    return (
      <section className='learn-box' hidden={display}>
        <h2>LEARN</h2>
        <h3>Your word is...</h3>
        <h4>{this.props.word.untranslated}</h4>
        <p aria-live="polite">({this.props.word.phonetic})</p>
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
            document.getElementById('answer-box').value = '';
          }}>
          <input 
            type='text'
            id='answer-box'
            name='answer'
            placeholder='Input answer here'
            required
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
      </section>
    );
    
    
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

export default requiresLogin()(connect(mapStateToProps)(Learn));
