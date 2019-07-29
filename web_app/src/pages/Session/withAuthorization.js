import React from 'react';
import { withFirebase } from '..//Firebase';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes'
import AuthUserContext from './context';
import { compose } from 'recompose';


const withAuthorization = condition => Component => {
    class WithAuthorization extends React.Component {
        componentDidMount() {
            this.listener = this.props.firebase.onAuthUserListener(
                authUser => {
                    if (!condition(authUser)) {
                        console.log(authUser);
                        this.props.history.push(ROUTES.HOME);
                    }
                },
                () => this.props.history.push(ROUTES.SIGN_IN),
            );
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            return (
                <AuthUserContext.Consumer>
                    {authUser =>
                        condition(authUser) ? <Component authUser={authUser} {...this.props} /> : null
                    }
                </AuthUserContext.Consumer>
            );
        }
    }

    return compose(withRouter, withFirebase)(WithAuthorization);
};

export default withAuthorization;