import React from 'react';
import styled from 'styled-components';
import { borderCss } from '../../commonStyled/fancy/fancyBase';
import variables from '../../../content/commonStyles/variables.scss'

const HeaderContainer = styled.div`
    height: 50px;
    border-bottom: ${borderCss}
    display: flex;
    align-items: center;
`;

const MenuButton = styled.div`
    cursor: pointer;
    width: 35px;
    margin: 0 5px;
`;

const MenuBar = styled.div`
    box-sizing: border-box;
    width: 35px;
    height: 5px;
    background-color: ${variables.tertiarycolor};
    margin: 6px 0;
    border-radius: 5px;
    border: 1px solid ${variables.tertiarycolor};
`;

const FancyMenuButton = ({ onClick }) => (
    <MenuButton onClick={onClick}>
        <MenuBar></MenuBar>
        <MenuBar></MenuBar>
        <MenuBar></MenuBar>
    </MenuButton>
);

const Header = ({ onMenuOpenClick }) => (
    <HeaderContainer>
        <FancyMenuButton onClick={onMenuOpenClick} />
    </HeaderContainer>
);

export default Header;