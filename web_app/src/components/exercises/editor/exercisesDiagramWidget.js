import React, { Component } from 'react';
import { DiagramModel } from "storm-react-diagrams";
import * as EXERCISES from '../../../constants/exercises';
import ExercisesDiagram from './exercisesDiagram';
import ExercisesDiagramEngine from './exercisesDiagramUtility/exercisesDiagramEngine';
import { ColumnContainer, RowContainer } from '../../commonStyled';
import { DiagramExerciseNode, ExercisesDiagramWrapper } from '../styled';
import ExerciseStepOptions from './exerciseStepOptions';

class ExcercisesDiagramWidget extends Component {
    dragged = null;

    constructor(props) {
        super(props);
        this.exercisesDiagramEngine = new ExercisesDiagramEngine(this.countType, { selectionChanged: this.onNodeSelection });

        this.state = {
            changedExercisesOptions: {},
            selectedNode: null
        };

        this.optionsRef = React.createRef();
    }

    componentDidMount() {
        if (!!this.props.exercise) {
            this.exercisesDiagramEngine.setModel(this.serializeModel(this.props.exercise));
            this.forceUpdate();
        }
    }

    componentDidUpdate(prevProps) {
        const exercise = this.props.exercise;
        const prevExercise = prevProps.exercise;
        if (!!exercise && (!prevExercise || exercise.id !== prevExercise.id)) {
            this.exercisesDiagramEngine.setModel(this.serializeModel(this.props.exercise));
            this.forceUpdate();
        }
        else if (!!prevExercise && !exercise) {
            this.exercisesDiagramEngine.setEmptyModel();
            this.forceUpdate();
        }
    }

    countType = type => {
        const nodes = this.exercisesDiagramEngine.getNodes();
        return Object.keys(nodes).filter(x => nodes[x].customType === type).length;
    }

    onDragStart = event => {
        this.dragged = event.target.id;
    }

    getModelToSaving = () => {
        const model = this.exercisesDiagramEngine.serializeAndClearModel();
        const changedExercisesOptions = this.getChangedExercisesOptions();
        const nodeWithChangedOptions = Object.keys(changedExercisesOptions);
        if (!!nodeWithChangedOptions) {
            nodeWithChangedOptions.forEach(x => {
                const index = model.nodes.findIndex(n => n.id === x);
                if (index > -1)
                    model.nodes[index].options = changedExercisesOptions[x];
            });
        }
        return model;
    }

    serializeModel(model) {
        let newModel = new DiagramModel();
        newModel.deSerializeDiagram(JSON.parse(JSON.stringify(model)), this.exercisesDiagramEngine.getDiagramEngine());
        Object.keys(newModel.nodes).forEach(key => newModel.nodes[key].addListener({ selectionChanged: this.onNodeSelection }));
        return newModel;
    }

    onDrop = event => {
        const points = this.exercisesDiagramEngine.getDiagramEngine().getRelativeMousePoint(event);
        this.exercisesDiagramEngine.addNode(this.dragged, points);
        this.dragged = null;
        this.forceUpdate();
    }

    getChangedExercisesOptions = () => {
        const { changedExercisesOptions, selectedNode } = this.state;
        let options = { ...changedExercisesOptions };

        if (!!selectedNode && !!this.optionsRef.current && this.optionsRef.current.wasOptionsEdited())
            options[selectedNode.id] = this.optionsRef.current.getOptions();

        return options;
    }

    onNodeSelection = node => {
        node.stopPropagation();
        this.setState({
            selectedNode: node.isSelected ? node.entity : null,
            changedExercisesOptions: this.getChangedExercisesOptions()
        });
    }

    render() {
        const exercises = Object.keys(EXERCISES);
        const { selectedNode, changedExercisesOptions } = this.state;
        const optionsOfSelected = !!selectedNode && !!changedExercisesOptions[selectedNode.id] ? changedExercisesOptions[selectedNode.id] :
            (!!selectedNode ? selectedNode.options : null);

        return (
            <RowContainer>
                <ColumnContainer width="200px">
                    {exercises.map(x => <DiagramExerciseNode key={x} onDragStart={this.onDragStart} exercise={EXERCISES[x]} />)}
                </ColumnContainer>

                <ColumnContainer>
                    <ExercisesDiagramWrapper onDrop={this.onDrop} onDragOver={e => e.preventDefault()}>
                        <ExercisesDiagram exercisesDiagramEngine={this.exercisesDiagramEngine} />
                    </ExercisesDiagramWrapper>
                </ColumnContainer>

                <ColumnContainer width="200px">
                    {!!optionsOfSelected ? <ExerciseStepOptions ref={this.optionsRef} node={selectedNode} optionsValues={optionsOfSelected} /> : "Select an exercise node to show options."}
                </ColumnContainer>
            </RowContainer>
        );
    }
};

export default ExcercisesDiagramWidget;