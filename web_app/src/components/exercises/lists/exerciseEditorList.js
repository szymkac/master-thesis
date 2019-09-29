import React, { Component } from 'react';
import { ColumnContainer } from '../../commonStyled';
import { withFirebase } from '../../../services/firebase';
import ExerciseEditorListElement from './exerciseEditorListElement';
import ExerciseListHeader from './exerciseListHeader';

class ExerciseEditorList extends Component {
    state = {
        loading: false,
        exercises: [],
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

    onRemove = (uid) => {
        this.props.firebase.removeExercise(uid);
    }

    render() {
        const { match } = this.props;
        const { exercises, loading } = this.state;

        return (
            <div>
                {loading && <div>Loading...</div>}
                <ColumnContainer noBorder>
                    {/* <Link to={`${match.url}/${ROUTES.EXERCISES_CREATOR}`}>Create new</Link> */}
                    {exercises.length > 0 && <ExerciseListHeader />}

                    {
                        exercises.map(x =>
                            <ExerciseEditorListElement key={x.uid}
                                exercise={x}
                                url={match.url}
                                onRemove={this.onRemove} />
                        )
                    }
                </ColumnContainer>
            </div>
        )
    }
}

export default withFirebase(ExerciseEditorList);