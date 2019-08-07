import styled, { keyframes, css } from 'styled-components'

const AnimTable = styled.div`
    box-sizing: border-box;
    position:relative;
    width: 240px;
    height: 50px;
    margin: 0 auto;
    top: calc(100% - 150px);
    border: solid black 3px;
    border-bottom: 0;
`;

const lifting = keyframes`
  0%, 20% {
    top: calc(100% - 150px);
  }

  80%, 100% {
    top: 50px;
  }
`;

const putting = keyframes`
  0%, 20% {
    top: 50px;
  }

  80%, 100% {
    top: calc(100% - 150px);
  }
`;

const shifting = keyframes`
  0%, 20% {
    top: 100px;
    left: 20px;
  }

  80%, 100% {
    top: 100px;
    left: calc(100% - 120px);
  }
`;

const rotation = keyframes`
  0%, 20% {
    top: 100px;
    left: 100px;
  }

  80%, 100% {
    top: 100px;
    left: 100px;
    transform: rotate(180deg);
  }
`;

const shaking = keyframes`
  0%, 20% {
    top: 50px;
    left: 50px;
  }

  50%{
    top: calc(100% - 150px);
    left: calc(100% - 150px);
  }

  80%, 100% {
    top: 50px;
    left: 50px;
  }
`;

const getAnimCircleSetting = props => {
  switch (props.exercise) {
    case "LIFTING":
      return css` animation: ${lifting} 2s linear infinite;`;
    case "PUTTING":
      return css` animation: ${putting} 2s linear infinite;`;
    case "SHIFTING":
      return css` animation: ${shifting} 2s linear infinite;`;
    case "ROTATION":
      return css` animation: ${rotation} 2s linear infinite;`;
    case "SHAKING":
      return css` animation: ${shaking} 2s linear infinite;`;
    default:
      return css``;
  }
}

const AnimMoveCircle = styled.div`
    box-sizing: border-box;
    border: solid black 2px;
    border-radius: 50%;
    width: ${props => props.size || '100px'};
    height: ${props => props.size || '100px'};
    margin: ${props => props.center ? '0 auto' : '0'};
    position: relative;
    ${props => getAnimCircleSetting(props)}
`;

const PresureCircle = styled.div`
    box-sizing: border-box;
    border: solid black 2px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin: 0 auto;
`;

const TouchCircle = styled.div`
    box-sizing: border-box;
    border: solid black 2px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin: 0 auto;
    position: relative;
    ${props => props.bottom && css`
      top: calc(100% - 100px);
      z-index: 2;
      `}
`;

const ToutchColumn = styled.div`
  box-sizing: border-box;
  width: 20%;
  border: solid black 1px;
`;

export { AnimTable, AnimMoveCircle, ToutchColumn, PresureCircle, TouchCircle };