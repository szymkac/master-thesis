import React from 'react';
import { Link } from 'react-router-dom';
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
    <ul>
        <li>
            <Link to={ROUTES.LANDING} onClick={onClick}>Landing</Link>
        </li>
        <li>
            <Link to={ROUTES.HOME} onClick={onClick}>Home</Link>
        </li>
        <li>
            <Link to={ROUTES.ACCOUNT} onClick={onClick}>Account</Link>
        </li>
        <li>
            <Link to={`${ROUTES.EXERCISES}${ROUTES.EXERCISES_LANDING}`} onClick={onClick}>Excercises</Link>
        </li>
        {
            authUser.roles.includes(ROLES.ADMIN) &&
            <li>
                <Link to={ROUTES.ADMIN} onClick={onClick}>Admin</Link>
            </li>
        }
        <li>
            <LogoutButton />
        </li>
    </ul>
);

const NavigationNoAuthUser = ({ onClick }) => (
    <ul>
        <li>
            <Link to={ROUTES.SIGN_IN} onClick={onClick}>Login</Link>
        </li>
        <li>
            <Link to={ROUTES.LANDING} onClick={onClick}>Landing</Link>
        </li>
    </ul>
);

export default Navigation;