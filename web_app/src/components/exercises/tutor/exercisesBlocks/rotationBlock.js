import React, { Component } from 'react';
import { ExerciseBlockWrapper } from '../../styled'
import { AnimMoveCircle } from '../../styled/exerciseAnimationItems'


class RotationBlock extends Component {

    render() {
        return (
            <ExerciseBlockWrapper>
                <AnimMoveCircle exercise="ROTATION"></AnimMoveCircle>
            </ExerciseBlockWrapper>
        );
    }
}

export default RotationBlock;