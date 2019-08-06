import React, { Component } from 'react';
import { ExerciseBlockWrapper } from '../../../styled';
import { RowContainer } from '../../../../commonStyled';
import TouchReflexIndicator from './touchReflexIndicator';

class TouchingBlock extends Component {
    touch0Ref = React.createRef();
    touch1Ref = React.createRef();
    touch2Ref = React.createRef();
    touch3Ref = React.createRef();
    touch4Ref = React.createRef();

    shouldComponentUpdate(nextProps) {
        const { deviceData, hand } = nextProps;
        const { options } = this.props.model;

        return false;
    }

    render() {
        const { hand } = this.props;
        return (
            <ExerciseBlockWrapper>
                <RowContainer noBorder height="100%">
                    {hand === 'right' && <TouchReflexIndicator ref={this.touch0Ref} />}
                    <TouchReflexIndicator ref={this.touch1Ref} />
                    <TouchReflexIndicator ref={this.touch2Ref} />
                    <TouchReflexIndicator ref={this.touch3Ref} />
                    <TouchReflexIndicator ref={this.touch4Ref} />
                    {hand === 'left' && <TouchReflexIndicator ref={this.touch0Ref} />}
                </RowContainer>
            </ExerciseBlockWrapper>
        );
    }
}

export default TouchingBlock;