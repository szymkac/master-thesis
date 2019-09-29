import styled from 'styled-components';

const FancyLabel = styled.label`
    box-sizing: border-box;
    padding: 10px;
    font-family: inherit;
    font-size: ${props => props.smallLabel ? '1em' : '1.25em'};
    font-weight: bold;
    width: 100%;
`;

export default FancyLabel;