import React from 'react';
import ExercisesEditorPage from './exercisesEditorPage';
import ExercisesTutorPage from './exercisesTutorPage';
import ExercisesEditor from '../../components/exercises/editor/exercisesEditor';
import ExercisesTutor from '../../components/exercises/tutor/exercisesTutor';
import { ExercisesNavigation } from './exercisesNavigation';

const ExercisesPage = ({ match }) => (
  <div>
    <h1>Exercises Page</h1>
    <ExercisesNavigation match={match} />
  </div>
);

export default ExercisesPage;
export { ExercisesEditorPage, ExercisesTutorPage, ExercisesEditor, ExercisesTutor };