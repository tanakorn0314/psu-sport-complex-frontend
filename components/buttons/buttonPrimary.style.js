import styled from 'styled-components';
import { colors } from '../../styles/constants/colors';

const ButtonWrapper = styled.div`
    background-color: ${colors.lightBlue};
    padding: 10px 12px;
    border-radius: 10px;
    text-align: center;
    cursor: pointer;
    min-width: 60px;
    max-width: 100px;
    margin: 10px;
    transition: background-color .2s ease-in-out;
    &:hover {
        background-color: ${colors.accent}
    }
    .content {
        color: #fff
    }
`
export default ButtonWrapper;