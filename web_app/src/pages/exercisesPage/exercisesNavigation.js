import React from 'react';
import * as ROUTES from '../../constants/routes';
import { FancyBlockMenuLink, RowContainer } from '../../components/commonStyled';

const ExercisesNavigation = ({ match }) => (
    <RowContainer center noBorder wrapping>
            <FancyBlockMenuLink to={`${match.url}${ROUTES.EXERCISES_EDITOR}/${ROUTES.EXERCISES_CREATOR}`}>
                Create new exercise
            </FancyBlockMenuLink>
            <FancyBlockMenuLink to={`${match.url}${ROUTES.EXERCISES_EDITOR}`}>
                Edit yours exercises
            </FancyBlockMenuLink>
            <FancyBlockMenuLink to={`${match.url}${ROUTES.EXERCISES_TUTOR}`}>
                Exercises tutor
            </FancyBlockMenuLink>
    </RowContainer>
);

export { ExercisesNavigation };