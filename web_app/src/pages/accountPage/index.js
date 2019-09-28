import React from 'react';
import ChangePassword from './changePassword';
import { AuthUserContext, withAuthorization } from '../../services/session';
import { Page } from '../../components/commonStyled';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <Page>
        <h1>Account: {authUser.email}</h1>
        <ChangePassword />
      </Page>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);