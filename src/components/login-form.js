import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {login} from '../actions/auth';
import {required, nonEmpty} from '../validators';
import './style/login.css';

export class LoginForm extends React.Component {
  onSubmit(values) {
    return this.props.dispatch(login(values.usernameLogin, values.passwordLogin));
  }

  render() {
    let error;
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }
    return (
      <form
        className="login-form"
        onSubmit={this.props.handleSubmit(values =>
          this.onSubmit(values)
        )}>
        {error}
        <div className='login-form-e'>
          <label 
            className='login-label'
            htmlFor="usernameLogin">Username</label>
          <Field
            component={Input}
            type="text"
            name="usernameLogin"
            id="usernameLogin"
            validate={[required, nonEmpty]}
          />
        </div>
        <div className='login-form-e'>
          <label 
            className='login-label'
            htmlFor="passwordLogin">Password</label>
          <Field
            component={Input}
            type="password"
            name="passwordLogin"
            id="passwordLogin"
            validate={[required, nonEmpty]}
          />
        </div>
        <button disabled={this.props.pristine || this.props.submitting}>Log in</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);
