import styled from 'styled-components'
import { NavLink } from 'react-router-dom';
import { fancyButtonBase } from './fancyButton';

const FancyMenuLink = styled(NavLink)`
    ${fancyButtonBase}

    &.active {
      border-top: solid 5px white;
      border-bottom: solid 5px white;
    }
`;

export default FancyMenuLink;