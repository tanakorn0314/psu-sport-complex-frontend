import { colors } from '../../styles/constants/colors';
import styled from 'styled-components';

const FormSignInWrapper = styled.form`
    font-size: 16px;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 800px;
    border: solid 1px ${colors.border};
    border-radius: 30px;
    padding: 20px 50px 20px 50px;
    align-items: center;
    .input {
        width: 100%;
        padding: 5px 8px 5px 8px;
        border: solid 1px ${colors.lightBorder};
        border-radius: 10px;
        margin-bottom: 10px;
        outline: none;
    }
    .input: focus {
        box-shadow: 0 0 1px 1px ${colors.lightBlue};
    }
    .btn {
        margin: 0 auto 0 auto;
    }
    .alert {
        color: red;
        width: 100%;
        margin-bottom: 10px;
    }
`;

export default FormSignInWrapper;