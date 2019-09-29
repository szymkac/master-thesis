import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { fancyMenuButtonBase } from './fancyMenuButton';

const FancyMenuLink = styled(NavLink)`
    ${fancyMenuButtonBase}

    &.active {
      border-top: solid 5px white;
      border-bottom: solid 5px white;
    }
`;

export default FancyMenuLink;