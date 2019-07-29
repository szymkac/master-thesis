import React, { Component } from 'react';
import * as ROLES from '../../constants/roles';
import { withAuthorization } from '../Session'
import { withFirebase } from '../Firebase';


class Admin extends Component {
  state = {
    loading: false,
    users: []
  }

  componentWillMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key]
      }));
      this.setState({
        users: usersList,
        loading: false
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h1>Admin</h1>
        {loading && <div>Loading...</div>}
        <UsersList users={users} />
      </div>
    );
  }
}

const UsersList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <span>Id: {user.uid} </span>
        <span>Email: {user.email} </span>
        <span>Username: {user.username} </span>
      </li>
    ))}
  </ul>
);

const condition = authUser =>
  !!authUser && authUser.roles.includes(ROLES.ADMIN);


export default withFirebase(withAuthorization(condition)(Admin));