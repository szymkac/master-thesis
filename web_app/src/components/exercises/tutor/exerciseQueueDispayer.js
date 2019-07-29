import React, { Component } from 'react';
import ExerciseBlockDiplayer from './exercisesBlocks/exerciseBlockDiplayer';

const succesModel = { customType: "SUCCESS" };

class ExerciseQueueDispayer extends Component {
    state = {
        currentStepIndex: 0,
        loopIterator: {},
        showSucces: false
    }

    onStepDone = () => {
        const exerciseQueue = this.props.exerciseModel.exerciseQueue;
        let { currentStepIndex, loopIterator, showSucces } = this.state;
        const currentNode = exerciseQueue[currentStepIndex];
        const nextNode = exerciseQueue[currentStepIndex + 1];

        if (showSucces)
            showSucces = false;
        else {
            switch (nextNode.customType) {
                case "LOOP":
                    loopIterator = { ...loopIterator, [nextNode.id]: (!!loopIterator[nextNode.id] ? loopIterator[nextNode.id] + 1 : 1) };
                    currentStepIndex = loopIterator[nextNode.id] > nextNode.options.iterations ? currentStepIndex + 2 : nextNode.jumpTo;
                    break;
                case "SINGPOST":
                    currentStepIndex += 2;
                    break;
                default:
                    showSucces = currentNode.customType !== "START" && currentNode.customType !== "DELAY";
                    currentStepIndex++;
                    break;
            }
        }

        this.setState({
            currentStepIndex,
            loopIterator,
            showSucces
        });
    }

    render() {
        const { exerciseModel, deviceData, hand } = this.props;
        const { currentStepIndex, showSucces } = this.state;
        return (
            <div>
                <ExerciseBlockDiplayer
                    model={showSucces ? succesModel : exerciseModel.exerciseQueue[currentStepIndex]}
                    deviceData={currentStepIndex > 0 ? deviceData : null}
                    onStepDone={this.onStepDone}
                    hand={hand} />
                Step {currentStepIndex + 1} of {exerciseModel.exerciseQueue.length}
                <button onClick={this.onStepDone}>Next step</button>
            </div>
        );
    }
}

ExerciseQueueDispayer.defaultProps = {
    exerciseModel: null,
    hand: 'right'
}

export default ExerciseQueueDispayer;