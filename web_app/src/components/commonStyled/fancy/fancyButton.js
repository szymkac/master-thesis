import styled, { css } from 'styled-components';
import variables from '../../../content/commonStyles/variables.scss';
import { borderCss } from './fancyBase';

const fancyButtonBase = css`
    box-sizing: border-box;
    height: 35px;
    width: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${variables.secondarycolor};
    text-decoration: none;
    font-weight: bold;
    border: ${borderCss}
    border-radius: 20px;
    margin: 5px;
    font-size: 1em;
    font-family: inherit;
    
    &:hover {
        background: ${variables.secondarycolor};
        color: white;
    }
`;

const FancyButton = styled.button`
    background: transparent;
    outline: none;

    ${fancyButtonBase}
`;

export default FancyButton;
export { fancyButtonBase }