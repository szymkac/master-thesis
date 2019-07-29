import styled, {css} from 'styled-components'

const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: solid black 1px;
    width: ${props => props.width || 'auto'};
    min-width: ${props => props.minWidth || 'auto'};
    max-width: ${props => props.maxWidth || 'auto'};
    flex-grow: ${props => props.grow ? props.grow : (props.width || props.minWidth || props.maxWidth)? 0 : 1};

    ${props => props.center && css`
        align-items: center;
    `}
`;

export default ColumnContainer;