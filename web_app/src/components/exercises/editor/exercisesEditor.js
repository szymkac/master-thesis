import React, { Component } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../../services/firebase/index';
import ExcercisesDiagramWidget from './exercisesDiagramWidget';
import { TextBox, TextArea } from '../../common';
import { RowContainer, FancyButton } from '../../commonStyled';
import { ExercisesEditorWraper } from '../styled';
import * as ROUTES from '../../../constants/routes';


class ExercisesEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            exercise: null,
            name: "",
            description: ""
        }
        this.exerciseDiagramRef = React.createRef();
    }

    componentDidMount() {
        const { match } = this.props;
        if (!!match.params.id && match.params.id !== ROUTES.EXERCISES_CREATOR)
            this.fetchData();
    }

    componentDidUpdate(prevProps) {
        const { match } = this.props;
        if (!!match.params.id && match.params.id !== prevProps.match.params.id && match.params.id !== ROUTES.EXERCISES_CREATOR)
            this.fetchData();
        else if (!match.params.id && !!this.state.exercise)
            this.setState({
                exercise: null,
                name: "",
                description: ""
            });
    }

    fetchData = () => {
        if (!this.state.loading)
            this.setState({ loading: true });

        this.props.firebase.exercise(this.props.match.params.id).once('value', snapshot => {
            const exercise = { ...snapshot.val(), uid: this.props.match.params.id };
            this.setState({
                exercise: exercise,
                name: exercise.name,
                description: exercise.description,
                loading: false,
            });
        });
    }

    onValueChange = (value, propertyName) => {
        this.setState({ [propertyName]: value });
    }

    onSave = () => {
        const { firebase, match } = this.props;
        const { name, description } = this.state;
        const model = { ...this.exerciseDiagramRef.current.getModelToSaving(), name, description };
        if (!match.params.id || match.params.id === ROUTES.EXERCISES_CREATOR)
            firebase.exercises().push(model, this.redirectToExercises);
        else
            firebase.db.ref(`exercises/${match.params.id}`).set(model, this.redirectToExercises);
    }

    redirectToExercises = () => {
        this.props.history.push(`${ROUTES.EXERCISES}${ROUTES.EXERCISES_LANDING}`);
    }

    render() {
        const { match } = this.props;
        const { exercise, loading, name, description } = this.state;

        return (
            <ExercisesEditorWraper>
                {loading && <div>Loading...</div>}
                <RowContainer noBorder>
                    <TextBox propertyName="name" labelText="Exercise name" value={name} onChange={this.onValueChange} />
                    <TextArea propertyName="description" labelText="Exercise description" value={description} onChange={this.onValueChange} />
                    <FancyButton onClick={this.onSave}>Save</FancyButton>
                </RowContainer>
                {match.params.id === ROUTES.EXERCISES_CREATOR || !!exercise ? <ExcercisesDiagramWidget ref={this.exerciseDiagramRef} exercise={exercise} /> : null}
            </ExercisesEditorWraper>
        )
    }
}

export default compose(
    withFirebase,
    withRouter
)(ExercisesEditor);