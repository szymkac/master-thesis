import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../../services/firebase';
import * as ROUTES from '../../constants/routes';
import { Page, H1, RowContainer, ColumnContainer, FancyForm, FancyButton } from '../../components/commonStyled';
import { TextBox } from '../../components/common';
import { withAuthorization, isUserOffline } from '../../services/session';

const ForgetPasswordPage = () => (
  <Page>
    <H1 margin>Forget Password</H1>
    <RowContainer noBorder center>
      <ColumnContainer round width="500px" padding="25px" center>
        <ForgetPasswordForm />
      </ColumnContainer>
    </RowContainer>
  </Page>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class ForgetPasswordFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (value, propertyName) => {
    this.setState({ [propertyName]: value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <FancyForm onSubmit={this.onSubmit}>
        <TextBox
          name="email"
          propertyName="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <FancyButton stretch disabled={isInvalid} type="submit">
          Reset My Password
        </FancyButton>

        {error && <p>{error.message}</p>}
      </FancyForm>
    );
  }
}

const ForgetPasswordLink = () => (
  <p>
    Forgot Password? <Link to={ROUTES.PASSWORD_FORGET}>Click here!</Link>
  </p>
);

const ForgetPasswordForm = withFirebase(ForgetPasswordFormBase);

export default withAuthorization(isUserOffline)(ForgetPasswordPage);

export { ForgetPasswordForm, ForgetPasswordLink };