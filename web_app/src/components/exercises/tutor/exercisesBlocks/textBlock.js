import React, { Component } from 'react';
import { ExerciseBlockWrapper } from '../../styled';
import { TextContainer } from '../../../commonStyled';


class TextBlock extends Component {
    render() {
        const { text, children } = this.props;

        return (
            <ExerciseBlockWrapper>
                    <TextContainer center>
                        <h1>{text}</h1>
                    </TextContainer>
                    {children}
            </ExerciseBlockWrapper>
        );
    }
}

export default TextBlock;