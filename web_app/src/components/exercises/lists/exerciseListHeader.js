import React from 'react';
import { FancyListRow, FancyListCell } from '../../commonStyled';

const ExerciseListHeader = () => (
    <FancyListRow>
        <FancyListCell width='20%'>Name</FancyListCell>
        <FancyListCell width='50%'>Description</FancyListCell>
        <FancyListCell width='30%'>Actions</FancyListCell>
    </FancyListRow>
)

export default ExerciseListHeader;