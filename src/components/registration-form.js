import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {registerUser} from '../actions/users';
import Input from './input';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';

const passwordLength = length({min: 10, max: 72});
const matchesPassword = matches('passwordReg');


export class RegistrationForm extends React.Component {

  onSubmit(name, username, password) {
    const user = {name, username, password};
    return this.props
      .dispatch(registerUser(user));
  }

  render() {
    return (
      <form
        className="registration-form"
        onSubmit={this.props.handleSubmit(vals =>
        {
          this.onSubmit(vals.nameReg, vals.usernameReg, vals.passwordReg);
        }
        )}>
        {/*  <label htmlFor="firstName">First name</label>
        <Field component={Input} type="text" name="firstName" /> */}
        <label htmlFor="nameReg">Name</label>
        <Field component={Input} type="text" name="nameReg" />
        <label htmlFor="usernameReg">Username</label>
        <Field
          component={Input}
          type="text"
          name="usernameReg"
          validate={[required, nonEmpty, isTrimmed]}
        />
        <label htmlFor="passwordReg">Password</label>
        <Field
          component={Input}
          type="password"
          name="passwordReg"
          validate={[required, passwordLength, isTrimmed]}
        />
        <label htmlFor="passwordConfirmReg">Confirm password</label>
        <Field
          component={Input}
          type="password"
          name="passwordConfirmReg"
          validate={[required, nonEmpty, matchesPassword]}
        />
        <button
          type="submit"
          disabled={this.props.pristine || this.props.submitting}>
                    Register
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'registration',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
