import React, { Component } from 'react';
import { ExerciseBlockWrapper } from '../../styled';
import { TextContainer, H1 } from '../../../commonStyled';


class TextBlock extends Component {
    render() {
        const { text, children } = this.props;

        return (
            <ExerciseBlockWrapper>
                    <TextContainer noWrap center>
                        <H1>{text}</H1>
                    </TextContainer>
                    {children}
            </ExerciseBlockWrapper>
        );
    }
}

export default TextBlock;