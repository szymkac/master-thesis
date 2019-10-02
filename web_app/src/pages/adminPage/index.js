import React, { Component } from 'react';
import { withAuthorization, isUserAdmin } from '../../services/session';
import { withFirebase } from '../../services/firebase';
import { Page } from '../../components/commonStyled';


class AdminPage extends Component {
  state = {
    loading: false,
    users: []
  }

  componentWillMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key], uid: key
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
      <Page>
        <h1>Admin</h1>
        {loading && <div>Loading...</div>}
        <UsersList users={users} />
      </Page>
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

export default withFirebase(withAuthorization(isUserAdmin)(AdminPage));