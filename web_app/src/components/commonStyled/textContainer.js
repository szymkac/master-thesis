import styled, { css } from 'styled-components';

const TextContainer = styled.div`
    ${
    props => props.center ?
        css`
            text-align: center;
        ` :
        (
            props.normal ?
                css`
                    white-space: normal;
                    word-wrap: break-word;
                    width: 100%;
                ` :
                css`
                    text-align: justify;
                    text-justify: inter-word;
                    text-indent: 2em;
                `
        )
    }
`;

export default TextContainer;