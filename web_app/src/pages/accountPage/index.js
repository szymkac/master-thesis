import React from 'react';
import ChangePassword from './changePassword';
import { AuthUserContext, withAuthorization } from '../../services/session';
import { Page, H1 } from '../../components/commonStyled';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <Page>
        <H1 margin>Account: {authUser.email}</H1>
        <ChangePassword />
      </Page>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);