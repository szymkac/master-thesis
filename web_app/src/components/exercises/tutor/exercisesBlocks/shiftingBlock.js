import React, { Component } from 'react';
import { ExerciseBlockWrapper } from '../../styled';
import { AnimMoveCircle } from '../../styled/exerciseAnimationItems';
import { filterNormAcceleration } from '../../../../utilities/mpu9250Filter';

class ShiftingBlock extends Component {
    componentDidUpdate() {
        const { deviceData, onStepDone } = this.props;
        const { options } = this.props.model;
        const a = filterNormAcceleration(deviceData);
        const acceleration2d = Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2));

        if (acceleration2d > options.threshold)
            onStepDone();
    }

    render() {
        return (
            <ExerciseBlockWrapper>
                <AnimMoveCircle exercise="SHIFTING"></AnimMoveCircle>
            </ExerciseBlockWrapper>
        );
    }
}

export default ShiftingBlock;