import React, { Component } from 'react';
import { ExerciseBlockWrapper } from '../../styled';
import { AnimMoveCircle } from '../../styled/exerciseAnimationItems';


class ShiftingBlock extends Component {

    render() {
        return (
            <ExerciseBlockWrapper>
                <AnimMoveCircle exercise="SHIFTING"></AnimMoveCircle>
            </ExerciseBlockWrapper>
        );
    }
}

export default ShiftingBlock;