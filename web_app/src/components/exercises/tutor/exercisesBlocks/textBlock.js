import React, { Component } from 'react';
import { ExerciseBlockWrapper } from '../../styled';


class TextBlock extends Component {
    render() {
        const { text, children } = this.props;

        return (
            <ExerciseBlockWrapper>
                <h1>{text}</h1>
                {children}
            </ExerciseBlockWrapper>
        );
    }
}

export default TextBlock;