import React from 'react';
import { FancyMenuButton } from '../../commonStyled';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../../services/firebase';
import { compose } from 'recompose';
import * as ROUTES from '../../../constants/routes';

const SignOutButton = ({ firebase, history, onClick }) => (
  <FancyMenuButton type="button" onClick={() => {
    firebase.doSignOut();
    history.push(ROUTES.HOME);
    if (typeof onClick === "function")
      onClick();
  }}>
    Sign Out
  </FancyMenuButton>
);

export default compose(
  withRouter,
  withFirebase
)(SignOutButton);