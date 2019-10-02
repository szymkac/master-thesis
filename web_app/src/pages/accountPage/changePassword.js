import React, { Component } from 'react';
import { withFirebase } from '../../services/firebase';
import { FancyForm, FancyButton } from '../../components/commonStyled';
import { TextBox } from '../../components/common';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class ChangePassword extends Component {
  state = {
    ...INITIAL_STATE
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

    return (
      <FancyForm onSubmit={this.onSubmit}>
        <TextBox
          name="passwordOne"
          propertyName="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="New Password"
        />
        <TextBox
          name="passwordTwo"
          propertyName="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm New Password"
        />
        <FancyButton stretch disabled={isInvalid} type="submit">
          Reset My Password
        </FancyButton>

        {error && <p>{error.message}</p>}
      </FancyForm>
    );
  }
}

export default withFirebase(ChangePassword);