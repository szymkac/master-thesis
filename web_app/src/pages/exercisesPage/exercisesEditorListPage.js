import React from 'react';
import { Page } from '../../components/commonStyled';
import { withAuthorization, isUserOnline } from '../../services/session';
import { ExerciseEditorList } from '../../components/exercises/lists';

const ExercisesEditorListPage = ({ match }) => (
    <Page>
        <h1>Exercises Page</h1>
        <ExerciseEditorList match={match} />
    </Page>
);

export default withAuthorization(isUserOnline)(ExercisesEditorListPage);