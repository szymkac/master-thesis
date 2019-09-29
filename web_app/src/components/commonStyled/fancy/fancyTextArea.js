import styled from 'styled-components';
import { inputBase } from './fancyBase';

const FancyTextArea = styled.textarea`
    ${inputBase}
    resize: none;
`;

export default FancyTextArea;