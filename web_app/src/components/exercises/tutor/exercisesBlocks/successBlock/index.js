import React, { Component } from 'react';
import { ExerciseBlockWrapper } from '../../../styled';
import { FillContainer, SquareContainer } from '../../../../commonStyled';

import './successBlock.scss';
class SuccessBlock extends Component {
    componentDidMount() {
        setTimeout(this.props.onStepDone, 1500);
    }
    render() {
        return (
            <ExerciseBlockWrapper>
                <FillContainer>
                    <SquareContainer size="250px">
                        <svg className="check-mark">
                            <path d="M 15 125 l 80 90 l 140 -180" stroke="black" strokeWidth="15" fill="none" strokeLinecap="round" />
                        </svg>
                    </SquareContainer>
                </FillContainer>
            </ExerciseBlockWrapper>
        )
    }
}

export default SuccessBlock;