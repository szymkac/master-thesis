import styled, { css } from 'styled-components';

const fancyMenuButtonBase = css`
    box-sizing: border-box;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-decoration: none;
    font-size: large;
    font-weight: bold;
    font-family: inherit;

    &:hover {
        border-top: dashed 5px white;
        border-bottom: dashed 5px white;
    }
`;

const FancyMenuButton = styled.button`
    background: transparent;
    border: 0;
    width: 100%;
    outline:none;

    ${fancyMenuButtonBase}

    &.active {
        border-top: solid 5px white;
        border-bottom: solid 5px white;
    }

`;

export default FancyMenuButton;
export { fancyMenuButtonBase }