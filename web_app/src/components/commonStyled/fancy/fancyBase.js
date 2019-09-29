import { css } from 'styled-components';
import variables from '../../../content/commonStyles/variables.scss';

const borderCss = `solid 3px ${variables.secondarycolor};`;

const inputBase = css`
    box-sizing: border-box;
    border: ${borderCss}
    padding: 5px;
    font-family: inherit;
    font-size: 0.8em;
    height: 35px;
    margin: 2px 5px 2px 15px;
    width: calc(100% - 20px);
    
    &:focus{
        outline: none;
    }
`;

export { borderCss, inputBase };