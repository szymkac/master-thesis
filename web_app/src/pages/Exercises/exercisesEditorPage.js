import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { ExercisesEditorNavigation } from './exercisesNavigation';

class ExercisesEditorPage extends Component {
    state = {
        loading: false,
        exercises: []
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
        const { match } = this.props;
        const { exercises, loading } = this.state;

        return (
            <div>
                <h1>Exercises Page</h1>
                {loading && <div>Loading...</div>}
                {!!exercises && <ExercisesEditorNavigation match={match} exercises={exercises} />}
            </div>
        );
    }
}


export default withFirebase(ExercisesEditorPage);
