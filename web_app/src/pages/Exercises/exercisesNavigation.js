import React from 'react';
import { Link } from "react-router-dom";
import * as ROUTES from '../../constants/routes';

const ExercisesNavigation = ({ match }) => (
    <ul>
        <li>
            <Link to={`${match.url}${ROUTES.EXERCISES_EDITOR}${ROUTES.EXERCISES_CREATOR}`}>Create new exercise</Link>
        </li>
        <li>
            <Link to={`${match.url}${ROUTES.EXERCISES_EDITOR}`}>Edit yours exercises</Link>
        </li>
        <li>
            <Link to={`${match.url}${ROUTES.EXERCISES_TUTOR}`}>Exercises tutor</Link>
        </li>
    </ul>
);

const ExercisesTutorNavigation = ({ match, exercises, authUser, hand }) => (
    <ul>
        {
            exercises.map(x =>
                <li key={x.uid}>
                    <Link
                        to={{
                            pathname: `${match.url}/${x.uid}`,
                            state: { authUser, hand }
                        }}>
                        {x.name}
                    </Link>
                </li>
            )
        }
    </ul>
);

const ExercisesEditorNavigation = ({ match, exercises }) => (
    <ul>
        <li>
            <Link to={`${match.url}${ROUTES.EXERCISES_CREATOR}`}>Create new</Link>
        </li>
        {
            exercises.map(x =>
                <li key={x.uid}>
                    {x.name}
                    <Link to={`${match.url}/${x.uid}`}> Edit</Link>
                </li>
            )
        }
    </ul>
);

export { ExercisesNavigation, ExercisesTutorNavigation, ExercisesEditorNavigation };