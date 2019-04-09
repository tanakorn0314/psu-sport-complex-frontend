import styled from 'styled-components';
import { Form } from 'antd';
import { palette } from 'styled-theme';

const StyledForm = styled(Form)`

    .input-left-right {
        display: flex;
        justify-content: space-between;
        width: 100%;
        .form-item {
            width: calc(100% - 10px);
            &:first-child {
                margin-right: 10px;
            }
        }
    }
    .form-item {
        margin-bottom: 0;
        width: 100%;
        input {
            width: 100%;
        }
        button {
            margin: 10px 0;
        }
    }
    .form-radio {
        .ant-form-item-label {
            padding: 0;
        }
    }
`;

export default StyledForm;
