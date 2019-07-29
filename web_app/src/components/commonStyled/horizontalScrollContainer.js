import styled from 'styled-components'

const HorizontalScrollContainer = styled.div`
    width: 100%;
    overflow-x: scroll;
    display: flex;
    height: ${props => props.height || 'auto'};
    align-items: flex-end;
`;

export default HorizontalScrollContainer;