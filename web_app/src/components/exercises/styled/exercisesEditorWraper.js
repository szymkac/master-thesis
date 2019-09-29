import styled from 'styled-components';
import { borderCss } from '../../commonStyled/fancy/fancyBase';
import { FancyButton } from '../../commonStyled';

const ExercisesEditorWraper = styled.div`
    border: ${borderCss}
    padding: 20px;
    border-radius: 20px;

    ${FancyButton}{
        align-self: flex-end;
        margin-bottom: 17px;
    }
`;

export default ExercisesEditorWraper;