import React, { Component } from 'react';
import { FancyListRow, FancyListCell, FancyButtonLink, FancyButton, TextContainer } from '../../commonStyled';

class ExerciseEditorListElement extends Component {
    onRemove = () => {
        const { exercise, onRemove } = this.props;
        onRemove(exercise.uid);
    }

    render() {
        const { exercise, url } = this.props;
        return (
            <FancyListRow key={exercise.uid}>

                <FancyListCell width='20%'>
                    <TextContainer normal>
                        {exercise.name}
                    </TextContainer>
                </FancyListCell>

                <FancyListCell width='50%'>
                    <TextContainer normal>
                        {exercise.description}
                    </TextContainer>
                </FancyListCell>

                <FancyListCell width='30%' center>

                    <FancyButtonLink to={`${url}/${exercise.uid}`}>
                        Edit
                    </FancyButtonLink>
                    <FancyButton onClick={this.onRemove}>
                        Remove
                    </FancyButton>

                </FancyListCell>
            </FancyListRow>
        );
    }
}

export default ExerciseEditorListElement;