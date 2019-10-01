import styled, { css } from 'styled-components';

const FancyLabel = styled.label`
    box-sizing: border-box;
    font-family: inherit;
    font-weight: bold;
    width: 100%;
    ${props => props.smallLabel ?
        css`
            font-size: 1em;
        ` :
        css`
            font-size: 1.25em;
            padding: 10px;
        `}
    ${
    props => props.row && css`
            display: flex;
            align-items: center;
        `
    }
`;

export default FancyLabel;