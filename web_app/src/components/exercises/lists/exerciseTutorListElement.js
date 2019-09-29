import React from 'react';
import { FancyListRow, FancyListCell, FancyButtonLink } from '../../commonStyled';

const ExerciseTutorListElement = ({ exercise, linkState, url }) => (
    <FancyListRow>

        <FancyListCell width='20%'>
            {exercise.name}
        </FancyListCell>

        <FancyListCell width='50%'>
            {exercise.description}
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