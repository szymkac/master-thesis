import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { SignUpLink } from '../signUpPage'
import { withFirebase } from '../../services/firebase';
import { compose } from 'recompose';
import { ForgetPasswordLink } from '../forgetPasswordPage'
import { Page, H1, RowContainer, ColumnContainer, FancyForm, FancyButton } from '../../components/commonStyled';
import { TextBox } from '../../components/common';
import { withAuthorization, isUserOffline } from '../../services/session';

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

const SignInPage = () => (
    <Page>
        <H1 margin>Login</H1>
        <RowContainer noBorder center>
            <ColumnContainer round width="500px" padding="25px" center>
                <SignInForm />
                <SignUpLink />
                <ForgetPasswordLink />
            </ColumnContainer>
        </RowContainer>
    </Page>
);

class SignInFormBase extends Component {
    state = {
        ...INITIAL_STATE
    }

    onSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    }

    onChange = (value, propertyName) => {
        this.setState({ [propertyName]: value });
    };

    render() {
        const { email, password, error } = this.state;
        const isInvalid = password === '' || email === '';

        return (
            <FancyForm onSubmit={this.onSubmit}>
                <TextBox
                    name="email"
                    propertyName="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <TextBox
                    name="password"
                    propertyName="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />
                <FancyButton stretch disabled={isInvalid} type="submit">Sign In</FancyButton>
                {error && <p>{error.message}</p>}
            </FancyForm>
        )
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase
)(SignInFormBase);

export default withAuthorization(isUserOffline)(SignInPage);
export { SignInForm }