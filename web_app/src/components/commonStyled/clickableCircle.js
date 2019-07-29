import styled from 'styled-components'

const ClickableCircle = styled.div`
    width: 10px;
    height: 10px;
    position: relative;
    top: -5px;
    background: gray;
    border-radius: 5px;
    cursor: poiter;
    :hover{
        background: lightgray
    }
`;

export default ClickableCircle;