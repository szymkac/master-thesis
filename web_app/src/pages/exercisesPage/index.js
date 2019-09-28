import React from 'react';
import ExercisesEditorListPage from './exercisesEditorListPage';
import ExercisesTutorListPage from './exercisesTutorListPage';
import ExercisesEditor from '../../components/exercises/editor/exercisesEditor';
import ExercisesTutor from '../../components/exercises/tutor/exercisesTutor';
import { ExercisesNavigation } from './exercisesNavigation';
import { Page } from '../../components/commonStyled';
import { withAuthorization, isUserOnline } from '../../services/session';

const ExercisesPage = ({ match }) => (
  <Page>
    <h1>Exercises Page</h1>
    <ExercisesNavigation match={match} />
  </Page>
);

const ExercisesEditorPage = props => (
  <Page>
    <ExercisesEditor {...props} />
  </Page>
);

const ExercisesTutorPage = props => (
  <Page>
    <ExercisesTutor {...props} />
  </Page>
);

export default withAuthorization(isUserOnline)(ExercisesPage);
export { ExercisesEditorListPage, ExercisesTutorListPage, ExercisesEditorPage, ExercisesTutorPage };