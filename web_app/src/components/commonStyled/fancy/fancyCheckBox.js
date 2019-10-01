import React from 'react';
import styled from 'styled-components';
import { borderCss } from './fancyBase';
import variables from '../../../content/commonStyles/variables.scss';
import getRandomId from '../../../utilities/randomIdGen';

const StyledCheckBox = styled.input`
    display: none;
`;

const FakeCheckBox = styled.label`
    box-sizing: border-box;
    border: ${borderCss}
    height: 35px;
    width: 35px;
    margin: 0 5px 0 15px;
    color: ${variables.secondarycolor};
    cursor: pointer;
    display: inline-block;
    text-align: center;
    font-size: 20px;
`;

const FancyCheckBoxLabel = styled.p`
    width: calc(100% - 55px);
`;

const FancyCheckBox = React.forwardRef((props, ref) => {
    const id = getRandomId();

    const { checked, defaultChecked } = props;
    const showCheck = defaultChecked !== "undefined" ? defaultChecked : checked;
    const check = showCheck ? {__html: '&#10003;'} : null;

    return (
        <>
            <StyledCheckBox ref={ref} id={id} type="checkbox" {...props} />
            <FakeCheckBox dangerouslySetInnerHTML={check} htmlFor={id} ></FakeCheckBox>
        </>
    );
});

export default FancyCheckBox;
export { FancyCheckBoxLabel };