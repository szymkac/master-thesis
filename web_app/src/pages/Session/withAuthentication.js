import React from 'react';
import { withFirebase } from '..//Firebase';
import { AuthUserContext } from '..//Session';

const withAuthentication = Component => {
    class WithAuthentication extends React.Component {
        state = {
            authUser: JSON.parse(localStorage.getItem('authUser')),
        };

        componentDidMount() {
            this.listener = this.props.firebase.onAuthUserListener(
                authUser => {
                    localStorage.setItem('authUser', JSON.stringify(authUser));
                    this.setState({ authUser });
                },
                () => {
                    localStorage.removeItem('authUser');
                    this.setState({ authUser: null });
                }
            );
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            return <AuthUserContext.Provider value={this.state.authUser}>
                <Component authUser={this.state.authUser} {...this.props} />
            </AuthUserContext.Provider>
        }
    }

    return withFirebase(WithAuthentication);
};

export default withAuthentication;