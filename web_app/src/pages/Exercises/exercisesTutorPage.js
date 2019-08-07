import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { ExercisesTutorNavigation } from './exercisesNavigation';
import { withAuthorization } from '../Session';
import * as HANDS from '../../constants/hands';

class ExercisesTutorPage extends Component {
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
            <div>
                <h1>Exercises Page</h1>
                {loading && <div>Loading...</div>}
                {!!exercises && <ExercisesTutorNavigation authUser={authUser} match={match} exercises={exercises} hand={hand} />}
            </div>
        );
    }
}

const condition = authUser => !!authUser;


export default withAuthorization(condition)(withFirebase(ExercisesTutorPage));
