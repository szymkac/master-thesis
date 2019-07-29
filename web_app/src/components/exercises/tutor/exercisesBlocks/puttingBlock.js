import React, { Component } from 'react';
import { ExerciseBlockWrapper } from '../../styled'
import { AnimTable, AnimMoveCircle } from '../../styled/exerciseAnimationItems'

class PuttingBlock extends Component {
    componentDidUpdate(prevProps) {
        const prevDeviceData = prevProps.deviceData;
        const { deviceData, onStepDone } = this.props;

        if (prevDeviceData.fl === 0 && deviceData.fl === 1)
            onStepDone()
    }

    render() {
        return (
            <ExerciseBlockWrapper>
                <AnimMoveCircle exercise="PUTTING" center></AnimMoveCircle>
                <AnimTable></AnimTable>
            </ExerciseBlockWrapper>
        );
    }
}

export default PuttingBlock;