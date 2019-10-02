import styled from 'styled-components';

const SquareContainer = styled.div`
    height: ${props => props.size || '100px'};
    width: ${props => props.size || '100px'};
`;

export default SquareContainer;