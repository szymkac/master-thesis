import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './pages/Navigation';
import Account from './pages/Account';
import Admin from './pages/Admin';
import ForgetPassword from './pages/ForgetPassword';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import * as ROUTES from './constants/routes';
import { withAuthentication } from './pages/Session';
import ExercisesPage, {ExercisesEditorPage, ExercisesTutorPage, ExercisesEditor,ExercisesTutor} from './pages/Exercises';
import './App.css';

class App extends Component{
  render(){
    return (
      <Router>
        <div>
          <Navigation />
          <Route exact path={ROUTES.LANDING} component={Landing} />
          <Route path={ROUTES.SIGN_UP} component={Register} />
          <Route path={ROUTES.SIGN_IN} component={Login} />
          <Route path={ROUTES.HOME} component={Home} />
          <Route path={ROUTES.ACCOUNT} component={Account} />
          <Route path={ROUTES.ADMIN} component={Admin} />
          <Route path={ROUTES.PASSWORD_FORGET} component={ForgetPassword} />

          <Route exact path={`${ROUTES.EXERCISES}${ROUTES.EXERCISES_LANDING}`} component={ExercisesPage}/>
          <Route exact path={`${ROUTES.EXERCISES}${ROUTES.EXERCISES_LANDING}${ROUTES.EXERCISES_EDITOR}`} component={ExercisesEditorPage} />
          <Route exact path={`${ROUTES.EXERCISES}${ROUTES.EXERCISES_LANDING}${ROUTES.EXERCISES_TUTOR}`} component={ExercisesTutorPage} />
          <Route exact path={`${ROUTES.EXERCISES}${ROUTES.EXERCISES_LANDING}${ROUTES.EXERCISES_EDITOR}/:id`} component={ExercisesEditor} />
          <Route exact path={`${ROUTES.EXERCISES}${ROUTES.EXERCISES_LANDING}${ROUTES.EXERCISES_TUTOR}/:id`} component={ExercisesTutor} />
        </div>
      </Router>
    )
  }
}

export default withAuthentication(App);
