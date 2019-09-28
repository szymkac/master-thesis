import React from 'react';
import { FancyButton } from '../../commonStyled';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../../services/firebase';
import { compose } from 'recompose';
import * as ROUTES from '../../../constants/routes';

const SignOutButton = ({ firebase, history, onClick }) => (
  <FancyButton type="button" onClick={() => {
    firebase.doSignOut();
    history.push(ROUTES.HOME);
    console.log("lol")
    if (typeof onClick === "function")
      onClick();
  }}>
    Sign Out
  </FancyButton>
);

export default compose(
  withRouter,
  withFirebase
)(SignOutButton);