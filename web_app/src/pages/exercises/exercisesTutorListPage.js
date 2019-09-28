import React, { Component } from 'react';
import { ExercisesTutorNavigation } from './exercisesNavigation';
import { withFirebase } from '../../services/firebase';
import { withAuthorization, isUserOnline } from '../../services/session';
import * as HANDS from '../../constants/hands';
import { Page } from '../../components/commonStyled';

class ExercisesTutorListPage extends Component {
    state = {
        loading: false,
        exercises: [],
        hand: HANDS.RIGHT
    }

    componentDidMount() {
        this.setState({ loading: true });

        this.listener = this.props.firebase.onExercisesListener(
            exercisesList => this.setState({
                exercises: exercisesList,
                loading: false
            }),
            () => console.log("firebase connection error")
        );
    }

    componentWillUnmount() {
        this.listener.off();
    }

    render() {
        const { match, authUser } = this.props;
        const { exercises, loading, hand } = this.state;

        return (
            <Page>
                <h1>Exercises Page</h1>
                {loading && <div>Loading...</div>}
                {!!exercises && <ExercisesTutorNavigation authUser={authUser} match={match} exercises={exercises} hand={hand} />}
            </Page>
        );
    }
}

export default withAuthorization(isUserOnline)(withFirebase(ExercisesTutorListPage));