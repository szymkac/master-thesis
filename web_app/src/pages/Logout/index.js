import React from 'react';
import { FancyButton } from '../../components/commonStyled';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase, onClick }) => (
  <FancyButton type="button" onClick={() => {
    firebase.doSignOut();
    if (typeof onClick === "function")
      onClick();
  }}>
    Sign Out
  </FancyButton>
);

export default withFirebase(SignOutButton);