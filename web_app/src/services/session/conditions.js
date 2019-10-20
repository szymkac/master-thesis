import { ROLES } from '../../constants/roles';

const isUserOnline = authUser => !!authUser;

const isUserOffline = authUser => {
    console.log(authUser);
    return true;
};

const isUserAdmin = authUser =>
    !!authUser && authUser.roles.includes(ROLES.ADMIN);


export { isUserOnline, isUserAdmin, isUserOffline };