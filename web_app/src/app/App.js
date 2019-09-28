import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { withAuthentication } from '../services/session';
import Layout from '../components/layout';
import {
  AccountPage,
  AdminPage,
  ExercisesPage,
  ExercisesEditorListPage,
  ExercisesEditorPage,
  ExercisesTutorListPage,
  ExercisesTutorPage,
  ForgetPasswordPage,
  HomePage,
  SignInPage,
  SignUpPage
} from '../pages';

const App = () => {
  return (
    <Router>
      <Layout>
        <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route exact path={ROUTES.HOME} component={HomePage} />
        <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route exact path={ROUTES.ADMIN} component={AdminPage} />
        <Route exact path={ROUTES.PASSWORD_FORGET} component={ForgetPasswordPage} />

        <Route exact path={`${ROUTES.EXERCISES}${ROUTES.EXERCISES_LANDING}`} component={ExercisesPage} />
        <Route exact path={`${ROUTES.EXERCISES}${ROUTES.EXERCISES_LANDING}${ROUTES.EXERCISES_EDITOR}`} component={ExercisesEditorListPage} />
        <Route exact path={`${ROUTES.EXERCISES}${ROUTES.EXERCISES_LANDING}${ROUTES.EXERCISES_TUTOR}`} component={ExercisesTutorListPage} />
        <Route exact path={`${ROUTES.EXERCISES}${ROUTES.EXERCISES_LANDING}${ROUTES.EXERCISES_EDITOR}/:id`} component={ExercisesEditorPage} />
        <Route exact path={`${ROUTES.EXERCISES}${ROUTES.EXERCISES_LANDING}${ROUTES.EXERCISES_TUTOR}/:id`} component={ExercisesTutorPage} />
      </Layout>
    </Router>
  )
}

export default withAuthentication(App);
