import React, { Component } from 'react';
import { ExerciseBlockWrapper } from '../../styled'
import { AnimMoveCircle } from '../../styled/exerciseAnimationItems'
import { filterGyro } from '../../../../utilities/mpu9250Filter';

class RotationBlock extends Component {
    componentDidUpdate() {
        const { deviceData, onStepDone } = this.props;
        const { options } = this.props.model;
        const g = filterGyro(deviceData);
        console.log(deviceData.f);
        if (Math.abs(g.x) > options.threshold || Math.abs(g.y) > options.threshold || Math.abs(g.z) > options.threshold)
            onStepDone();
    }

    render() {
        return (
            <ExerciseBlockWrapper>
                <AnimMoveCircle exercise="ROTATION"></AnimMoveCircle>
            </ExerciseBlockWrapper>
        );
    }
}

export default RotationBlock;