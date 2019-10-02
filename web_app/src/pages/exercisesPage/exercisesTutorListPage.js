import React from 'react';
import { withAuthorization, isUserOnline } from '../../services/session';
import { Page, H1 } from '../../components/commonStyled';
import { ExerciseTutorList } from '../../components/exercises/lists';

const ExercisesTutorListPage = ({ match, authUser }) => (
    <Page>
        <H1 margin>Exercises Tutor Page</H1>
        <ExerciseTutorList match={match} authUser={authUser} />
    </Page>
);

export default withAuthorization(isUserOnline)(ExercisesTutorListPage);