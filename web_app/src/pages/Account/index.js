import React from 'react';
import ChangePassword from '../ChangePassword'
import { AuthUserContext, withAuthorization } from '../Session'

const Account = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Account: {authUser.email}</h1>
        <ChangePassword />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Account);