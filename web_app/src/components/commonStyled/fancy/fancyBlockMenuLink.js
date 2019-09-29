import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import variables from '../../../content/commonStyles/variables.scss';

const FancyBlockMenuLink = styled(NavLink)`
    box-sizing: border-box;
    height: 350px;
    width: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-decoration: none;
    font-size: 1.90em;
    font-weight: bold;
    margin: 25px;
    border: solid 5px black;
    border-radius: 50px;
    user-drag: none;
    background: ${variables.secondarycolor};
    font-family: inherit;

    &:hover{
        text-decoration: underline;
        background: radial-gradient(${variables.secondarycolor} 80%, transparent);
    }
`;

export default FancyBlockMenuLink;