import React, { Component } from 'react';
import ExerciseBlockDiplayer from './exercisesBlocks/exerciseBlockDiplayer';
import * as HANDS from '../../../constants/hands';
import { RowContainer, FancyButton } from '../../commonStyled';
import { SUCCESS } from '../../../constants/other';
import * as EXERCISES from '../../../constants/exercises';

const succesModel = { customType: SUCCESS };

class ExerciseQueueDispayer extends Component {
    state = {
        currentStepIndex: 0,
        loopIterator: {},
        showSucces: false
    }
    startTime = null;

    onStepDone = () => {
        const exerciseQueue = this.props.exerciseModel.exerciseQueue;
        let { currentStepIndex, loopIterator, showSucces } = this.state;
        const currentNode = exerciseQueue[currentStepIndex];
        const nextNode = exerciseQueue[currentStepIndex + 1];

        if (currentNode.customType === EXERCISES.START.type) {
            this.startTime = performance.now();
            console.log(this.startTime)
        }
        else if (currentNode.customType === EXERCISES.FINISH.type) {
            const endTime = performance.now();
            this.props.onFinish(endTime - this.startTime);
            console.log(endTime)
        }

        if (showSucces)
            showSucces = false;
        else {
            switch (nextNode.customType) {
                case EXERCISES.LOOP.type:
                    loopIterator = { ...loopIterator, [nextNode.id]: (!!loopIterator[nextNode.id] ? loopIterator[nextNode.id] + 1 : 1) };
                    if (loopIterator[nextNode.id] >= nextNode.options.iterations) {
                        currentStepIndex = currentStepIndex + 2;
                        showSucces = nextNode.options.showSucces;
                    }
                    else {
                        currentStepIndex = nextNode.jumpTo;
                        showSucces = currentNode.options.showSucces;
                    }
                    break;
                case EXERCISES.SINGPOST.type:
                    currentStepIndex += 2;
                    break;
                default:
                    showSucces = currentNode.customType !== EXERCISES.START.type && currentNode.customType !== EXERCISES.DELAY.type && currentNode.options.showSucces;
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
        const { exerciseModel, deviceData, hand, showHidden } = this.props;
        const { currentStepIndex, showSucces } = this.state;
        return (
            <>
                <ExerciseBlockDiplayer
                    model={showSucces ? succesModel : exerciseModel.exerciseQueue[currentStepIndex]}
                    deviceData={currentStepIndex > 0 ? deviceData : null}
                    onStepDone={this.onStepDone}
                    hand={hand} />
                <RowContainer center noBorder alignCenter padding="10px">
                    Step {currentStepIndex + 1} of {exerciseModel.exerciseQueue.length}
                    {showHidden && <FancyButton disabled={currentStepIndex + 1 === exerciseModel.exerciseQueue.length} onClick={this.onStepDone}>Next step</FancyButton>}
                </RowContainer>
            </>
        );
    }
}

ExerciseQueueDispayer.defaultProps = {
    exerciseModel: null,
    hand: HANDS.RIGHT
}

export default ExerciseQueueDispayer;