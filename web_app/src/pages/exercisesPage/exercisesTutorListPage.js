import React from 'react';
import { withAuthorization, isUserOnline } from '../../services/session';
import { Page } from '../../components/commonStyled';
import { ExerciseTutorList } from '../../components/exercises/lists';

const ExercisesTutorListPage = ({ match, authUser }) => (
    <Page>
        <h1>Exercises Page</h1>
        <ExerciseTutorList match={match} authUser={authUser} />
    </Page>
);

export default withAuthorization(isUserOnline)(ExercisesTutorListPage);