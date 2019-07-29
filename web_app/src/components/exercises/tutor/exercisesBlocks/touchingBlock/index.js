import React, { Component } from 'react';
import { ExerciseBlockWrapper } from '../../../styled';
import { RowContainer } from '../../../../commonStyled';
import TouchReflexIndicator from './touchReflexIndicator';

class TouchingBlock extends Component {
    render() {
        return (
            <ExerciseBlockWrapper>
                <RowContainer noBorder height="100%">
                    <TouchReflexIndicator />
                    <TouchReflexIndicator />
                    <TouchReflexIndicator />
                    <TouchReflexIndicator />
                    <TouchReflexIndicator />
                </RowContainer>
            </ExerciseBlockWrapper>
        );
    }
}

export default TouchingBlock;