import styled from 'styled-components'
import { borderCss } from './fancy/fancyBase';

const RowContainer = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    ${props => !props.noBorder && `border: ${borderCss}`}
    ${props => props.width && `width: ${props.width};`}
    ${props => props.minWidth && `min-width: ${props.minWidth};`}
    ${props => props.maxWidth && `max-width: ${props.maxWidth};`}
    ${props => props.padding && `padding: ${props.padding};`}
    flex-grow: ${props => props.grow ? props.grow : (props.width || props.minWidth || props.maxWidth) ? 0 : 1};
    ${props => !!props.wrapping && 'flex-wrap: wrap;'}
    height: ${props => props.height || 'auto'};
    justify-content: ${props => props.center ? 'center' : 'flex-start'};
`;

export default RowContainer;