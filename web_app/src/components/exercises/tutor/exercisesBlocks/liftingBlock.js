import React, { Component } from 'react';
import { ExerciseBlockWrapper } from '../../styled'
import { AnimTable, AnimMoveCircle } from '../../styled/exerciseAnimationItems'

class LiftingBlock extends Component {
    componentDidUpdate(prevProps) {
        const prevDeviceData = prevProps.deviceData;
        const { deviceData, onStepDone } = this.props;

        if (prevDeviceData.fl === 1 && deviceData.fl === 0)
            onStepDone()
    }
    
    render() {
        return (
            <ExerciseBlockWrapper>
                <AnimMoveCircle exercise="LIFTING" center></AnimMoveCircle>
                <AnimTable></AnimTable>
            </ExerciseBlockWrapper>
        );
    }
}

export default LiftingBlock;