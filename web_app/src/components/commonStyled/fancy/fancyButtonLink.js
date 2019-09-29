import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { fancyButtonBase } from './fancyButton';

const FancyButtonLink = styled(NavLink)`
    ${fancyButtonBase}
`;

export default FancyButtonLink;