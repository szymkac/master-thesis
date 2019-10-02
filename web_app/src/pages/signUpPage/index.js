import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { ROLES_OPTIONS, ROLES } from '../../constants/roles';
import { withFirebase } from '../../services/firebase';
import { compose } from 'recompose';
import { Page, H1, RowContainer, ColumnContainer, FancyForm, FancyButton } from '../../components/commonStyled';
import { TextBox, Select } from '../../components/common';
import { withAuthorization, isUserOffline } from '../../services/session';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  role: ROLES.PATIENT,
  error: null,
};

const SignUpPage = () => (
  <Page>
    <H1 margin>Register</H1>
    <RowContainer noBorder center>
      <ColumnContainer round width="500px" padding="25px" center>
        <SignUpForm />
      </ColumnContainer>
    </RowContainer>
  </Page>
);

class SignUpFormBase extends Component {
  state = {
    ...INITIAL_STATE
  }

  onSubmit = event => {
    const { username, email, passwordOne, role } = this.state;
    const roles = [role];
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
            roles
          });
      })
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  onChange = (value, propertyName) => {
    this.setState({ [propertyName]: value });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      role,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '' ||
      role === null;

    return (
      <FancyForm onSubmit={this.onSubmit}>
        <TextBox
          name="username"
          propertyName="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name" />

        <TextBox
          name="email"
          propertyName="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address" />

        <TextBox
          name="passwordOne"
          propertyName="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password" />

        <TextBox
          name="passwordTwo"
          propertyName="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password" />

        <Select
          name="role"
          propertyName="name"
          value={role}
          onChange={this.onChange}
          placeholder="User role"
          options={ROLES_OPTIONS}
        />

        <FancyButton stretch type="submit" disabled={isInvalid}>Sign Up</FancyButton>

        {error && <p>{error.message}</p>}
      </FancyForm>
    )
  }
}

const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase);

const SignUpLink = () => (
  <p>
    Don't have an account?  <Link to={ROUTES.SIGN_UP}>Create an account</Link>
  </p>
)

export default withAuthorization(isUserOffline)(SignUpPage);
export { SignUpLink, SignUpForm }