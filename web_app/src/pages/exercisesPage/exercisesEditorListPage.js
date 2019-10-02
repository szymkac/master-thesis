import React from 'react';
import { Page, H1 } from '../../components/commonStyled';
import { withAuthorization, isUserOnline } from '../../services/session';
import { ExerciseEditorList } from '../../components/exercises/lists';

const ExercisesEditorListPage = ({ match }) => (
    <Page>
        <H1 margin>Edit Exercises</H1>
        <ExerciseEditorList match={match} />
    </Page>
);

export default withAuthorization(isUserOnline)(ExercisesEditorListPage);