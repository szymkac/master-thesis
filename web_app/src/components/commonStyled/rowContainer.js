import styled from 'styled-components'

const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    ${props => !props.noBorder && 'border: solid black 1px;'}
    width: ${props => props.width || 'auto'};
    min-width: ${props => props.minWidth || 'auto'};
    max-width: ${props => props.maxWidth || 'auto'};
    flex-grow: ${props => props.grow ? props.grow : (props.width || props.minWidth || props.maxWidth) ? 0 : 1};
    height: ${props => props.height || 'auto'};
    justify-content: ${props => props.center ? 'center' : 'flex-start'};
`;

export default RowContainer;