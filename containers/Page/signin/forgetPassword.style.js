import styled from 'styled-components';
import { Form } from 'antd';

const StyledWrapper = styled(Form)`
    display: flex;

    .form-item {
        margin-bottom: 0;
        width: 100%;
        margin-right: 5px;
        input {
            width: 100%;
        }
        button {
            margin: 10px 0;
        }
    }

    .btnSubmit {
        margin: 3px;
    }
`;

export default StyledWrapper;