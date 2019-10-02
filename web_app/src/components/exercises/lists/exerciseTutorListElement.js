import React from 'react';
import { FancyListRow, FancyListCell, FancyButtonLink, TextContainer } from '../../commonStyled';

const ExerciseTutorListElement = ({ exercise, linkState, url }) => (
    <FancyListRow>

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

        <FancyListCell center width='30%'>
            <FancyButtonLink
                to={{
                    pathname: `${url}/${exercise.uid}`,
                    state: linkState
                }}>
                Tutor
            </FancyButtonLink>
        </FancyListCell>

    </FancyListRow>
);



export default ExerciseTutorListElement;