import React, { Component } from 'react';
import { ColumnContainer } from '../../commonStyled';
import { withFirebase } from '../../../services/firebase';
import * as HANDS from '../../../constants/hands';
import ExerciseTutorListElement from './exerciseTutorListElement';
import ExerciseListHeader from './exerciseListHeader';

class ExerciseTutorList extends Component {
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
        const { exercises, hand, loading } = this.state;

        return (
            <div>
                {loading && <div>Loading...</div>}
                <ColumnContainer noBorder>
                    {exercises.length > 0 && <ExerciseListHeader />}
                    {
                        exercises.map(x =>
                            <ExerciseTutorListElement key={x.uid} exercise={x} url={match.url} linkState={{ authUser, hand }} />
                        )
                    }
                </ColumnContainer>
            </div >
        )
    }
}

export default withFirebase(ExerciseTutorList);