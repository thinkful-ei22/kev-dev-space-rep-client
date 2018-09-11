import React from 'react';
import {connect} from 'react-redux';
import {fetchWord, answerWord} from '../actions/word';

export class LearningPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      localAns: null,
    };
  }

  componentDidMount(){
    this.props.dispatch(fetchWord());
  }

  // validateAnswer(){
  //   this.props.answer.translation.filter(
  //     item => {
  //       if(this.state.localAns === item){
  //         return(
  //           <div>
  //             <p>You answered correctly! 
  //               Other answers include: {this.props.answer.translation}</p>
  //           </div>
  //         );
  //     }
  //       else{
  //         return(
  //           <div>
  //             <p>Your answer was inccorect. 
  //               Answer: {this.props.answer.translation}</p>
  //           </div>
  //         );
  //       }
  // }
  // }

  render(){
    return(
      <div>
        <h1>Your word is...</h1>
        <h2>{this.props.word.untranslated}</h2>
        <h3>{this.props.word.phonetic}</h3>
        <form onSubmit={e => {
          this.props.dispatch(answerWord(this.props.word.id));
          this.setState({localAns: e.toLowerCase()});
        }} >
          <input 
            type='text'
            id='answerBox'
            name='submit'
            value='Enter in an answer'/>
          <input 
            type='submit' 
            id='answerButton' 
            className='answerButton' 
            name='submit' 
            value='Submit'
          />
        </form>
        {this.validateAnswer()}
      </div>);
  }
}

const mapStateToProps = (state, props) => ({
  word: state.word.word,
  answer: state.word.ans
});

export default connect (mapStateToProps)(LearningPage);