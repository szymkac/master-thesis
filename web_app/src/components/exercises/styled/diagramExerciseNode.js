import React from 'react';
import styled from 'styled-components'

const DiagramExerciseNodeInner = styled.div`
    font-family: sans-serif;
    color: white;
    font-size: 15px;
    user-select:none;

    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.2));
    
    :hover{
        background: rgba(0, 0, 0, 0.3);
    }
`;

const DiagramExerciseNodeOuter = styled.div`
    border: solid 2px black;
    border-radius: 5px;
    background: ${props => props.backgroundColor || "black"};
    height: 40px;
    margin: 1px 5px;
`;

const DiagramExerciseNode = ({exercise, onDragStart}) => (
    <DiagramExerciseNodeOuter draggable="true" onDragStart={onDragStart}
    id={exercise.type} backgroundColor={exercise.nodeColor}>
        <DiagramExerciseNodeInner>
            {exercise.name}
        </DiagramExerciseNodeInner>
    </DiagramExerciseNodeOuter>
);

export default DiagramExerciseNode;