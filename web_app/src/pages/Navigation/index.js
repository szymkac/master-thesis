import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import LogoutButton from '../Logout'
import { AuthUserContext } from '../Session';

const Navigation = ({ authUser }) => (
    <AuthUserContext.Consumer>
        {authUser => authUser
            ? <NavigationAuthUser authUser={authUser} /> : <NavigationNoAuthUser />}
    </AuthUserContext.Consumer>
)

const NavigationAuthUser = ({ authUser }) => (
    <ul>
        <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
            <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
            <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        <li>
            <Link to={`${ROUTES.EXERCISES}${ROUTES.EXERCISES_LANDING}`}>Excercises</Link>
        </li>
        {
            authUser.roles.includes(ROLES.ADMIN) &&
            <li>
                <Link to={ROUTES.ADMIN}>Admin</Link>
            </li>
        }
        <li>
            <LogoutButton />
        </li>
    </ul>
);

const NavigationNoAuthUser = () => (
    <ul>
        <li>
            <Link to={ROUTES.SIGN_IN}>Login</Link>
        </li>
        <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
    </ul>
);

export default Navigation;