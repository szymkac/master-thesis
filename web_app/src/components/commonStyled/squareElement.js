import styled, {css} from 'styled-components'

const SquareElement = styled.div`
    box-sizing: border-box;
    border: ${props => props.done ? 'green' : props.active ? 'blue' : 'black'} solid 3px;
    height: ${props => props.edgeLenght || '100px'};
    width: ${props => props.edgeLenght || '100px'};
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    flex-shrink: 0;
    user-select:none;
    ${props => props.clickable && css`
      cursor: pointer;
      :hover{
          background: lightgray
      }
    `}
`;

export default SquareElement;