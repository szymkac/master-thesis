import React from 'react';
import { FancyMenuLink } from '../../commonStyled';
import * as ROUTES from '../../../constants/routes';
import * as ROLES from '../../../constants/roles';
import LogoutButton from '../../../pages/Logout'
import { AuthUserContext } from '../../../pages/Session';

const Navigation = ({ authUser, onClick }) => (
    <AuthUserContext.Consumer>
        {authUser => authUser
            ? <NavigationAuthUser authUser={authUser} onClick={onClick} /> : <NavigationNoAuthUser onClick={onClick} />}
    </AuthUserContext.Consumer>
)

const NavigationAuthUser = ({ authUser, onClick }) => (
    <>
        <FancyMenuLink exact={true} to={ROUTES.LANDING} onClick={onClick}>Landing</FancyMenuLink>
        <FancyMenuLink to={ROUTES.HOME} onClick={onClick}>Home</FancyMenuLink>
        <FancyMenuLink to={ROUTES.ACCOUNT} onClick={onClick}>Account</FancyMenuLink>
        <FancyMenuLink to={`${ROUTES.EXERCISES}${ROUTES.EXERCISES_LANDING}`} onClick={onClick}>Excercises</FancyMenuLink>
        {authUser.roles.includes(ROLES.ADMIN) && <FancyMenuLink to={ROUTES.ADMIN} onClick={onClick}>Admin</FancyMenuLink>}
        <LogoutButton onClick={onClick} />
    </>
);

const NavigationNoAuthUser = ({ onClick }) => (
    <>
        <FancyMenuLink exact={true} to={ROUTES.LANDING} onClick={onClick}>Landing</FancyMenuLink>
        <FancyMenuLink to={ROUTES.SIGN_IN} onClick={onClick}>Login</FancyMenuLink>
    </>
);

export default Navigation;