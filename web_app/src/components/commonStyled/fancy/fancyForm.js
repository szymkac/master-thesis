import styled from 'styled-components';
import FancyTextBox from './fancyTextBox';
import FancyButton from './fancyButton';
import FancySelect from './fancySelect';

const FancyForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;

    ${FancyTextBox},${FancyButton},${FancySelect}{
        margin: 7px 0;
    }

    p{
        margin: 5px 0;
    }
`;

export default FancyForm;