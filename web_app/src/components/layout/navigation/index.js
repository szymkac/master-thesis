import React from 'react';
import { FancyMenuLink } from '../../commonStyled';
import * as ROUTES from '../../../constants/routes';
import { ROLES } from '../../../constants/roles';
import SignOutButton from '../signOut'
import { AuthUserContext } from '../../../services/session';

const Navigation = ({ authUser, onClick }) => (
    <AuthUserContext.Consumer>
        {authUser => authUser
            ? <NavigationAuthUser authUser={authUser} onClick={onClick} /> : <NavigationNoAuthUser onClick={onClick} />}
    </AuthUserContext.Consumer>
)

const NavigationAuthUser = ({ authUser, onClick }) => (
    <>
        <FancyMenuLink exact={true} to={ROUTES.HOME} onClick={onClick}>Home</FancyMenuLink>
        <FancyMenuLink to={ROUTES.ACCOUNT} onClick={onClick}>Account</FancyMenuLink>
        <FancyMenuLink to={`${ROUTES.EXERCISES}${ROUTES.EXERCISES_LANDING}`} onClick={onClick}>Excercises</FancyMenuLink>
        {authUser.roles.includes(ROLES.ADMIN) && <FancyMenuLink to={ROUTES.ADMIN} onClick={onClick}>Admin</FancyMenuLink>}
        <SignOutButton onClick={onClick} />
    </>
);

const NavigationNoAuthUser = ({ onClick }) => (
    <>
        <FancyMenuLink exact={true} to={ROUTES.HOME} onClick={onClick}>Home</FancyMenuLink>
        <FancyMenuLink to={ROUTES.SIGN_IN} onClick={onClick}>Login</FancyMenuLink>
    </>
);

export default Navigation;