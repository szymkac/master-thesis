import React, { Component } from 'react';
import { withFirebase } from '../../../pages/Firebase/index';
import ExcercisesDiagramWidget from './exercisesDiagramWidget';
import { TextBox, TextArea } from '../../common';
import { RowContainer } from '../../commonStyled';


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
        console.log(match.params.id)
        if (!!match.params.id && match.params.id !== "new")
            this.fetchData();
    }

    componentDidUpdate(prevProps) {
        const { match } = this.props;
        if (!!match.params.id && match.params.id !== prevProps.match.params.id && match.params.id !== "new")
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
        if (!match.params.id || match.params.id === "new")
            firebase.exercises().push(model);
        else
            firebase.db.ref(`exercises/${match.params.id}`).set(model);
    }

    render() {
        const { match } = this.props;
        const { exercise, loading, name, description } = this.state;

        return (
            <div>
                {loading && <div>Loading...</div>}
                <RowContainer>
                    <TextBox propertyName="name" labelText="Exercise name" value={name} onChange={this.onValueChange} />
                    <TextArea propertyName="description" labelText="Exercise description" value={description} onChange={this.onValueChange} />
                    <button onClick={this.onSave}>Save</button>
                </RowContainer>
                {match.params.id === "new" || !!exercise ? <ExcercisesDiagramWidget ref={this.exerciseDiagramRef} exercise={exercise} /> : null}
            </div>
        )
    }
}

export default withFirebase(ExercisesEditor);