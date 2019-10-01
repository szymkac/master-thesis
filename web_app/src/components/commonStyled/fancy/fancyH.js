import styled from 'styled-components';

const H1 = styled.h1`
    ${props => props.margin ? "margin: 5px 0;" : "margin: 0;"}
`;

const H2 = styled.h2`
    ${props => props.margin ? "margin: 5px 0;" : "margin: 0;"}
`;

const H3 = styled.h3`
    ${props => props.margin ? "margin: 5px 0;" : "margin: 0;"}
`;

const H4 = styled.h4`
    ${props => props.margin ? "margin: 5px 0;" : "margin: 0;"}
`;

const H5 = styled.h5`
    ${props => props.margin ? "margin: 5px 0;" : "margin: 0;"}
`;

const H6 = styled.h6`
    ${props => props.margin ? "margin: 5px 0;" : "margin: 0;"}
`;

export {H1, H2, H3, H4, H5, H6};