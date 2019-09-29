import styled, { css } from 'styled-components';
import { borderCss } from './fancy/fancyBase';

const ColumnContainer = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    ${props => !props.noBorder && `border: ${borderCss}`}
    ${props => props.width && `width: ${props.width};`}
    ${props => props.minWidth && `min-width: ${props.minWidth};`}
    ${props => props.maxWidth && `max-width: ${props.maxWidth};`}
    ${props => props.padding && `padding: ${props.padding};`}
    flex-grow: ${props => props.grow ? props.grow : (props.width || props.minWidth || props.maxWidth) ? 0 : 1};

    ${props => props.center && css`
        align-items: center;
    `}
`;

export default ColumnContainer;