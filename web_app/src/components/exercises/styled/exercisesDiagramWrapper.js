import styled from 'styled-components'

const ExercisesDiagramWrapper = styled.div`
    flex-grow: 1;
    display: flex;
    cursor: move;
    overflow: hidden;
    height: 100%;
    min-height: 300px;
    background-color: #3c3c3c !important;
    background-image: linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent);
    background-size: 50px 50px;
`;

export default ExercisesDiagramWrapper;