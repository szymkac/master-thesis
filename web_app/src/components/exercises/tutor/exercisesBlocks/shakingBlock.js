import React, { Component } from 'react';
import { ExerciseBlockWrapper } from '../../styled'
import { AnimMoveCircle } from '../../styled/exerciseAnimationItems'


class ShakingBlock extends Component {

    render() {
        return (
            <ExerciseBlockWrapper>
                <AnimMoveCircle exercise="SHAKING"></AnimMoveCircle>
            </ExerciseBlockWrapper>
        );
    }
}

export default ShakingBlock;