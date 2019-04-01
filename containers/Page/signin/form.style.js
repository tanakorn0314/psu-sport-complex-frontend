import styled from 'styled-components';
import { Form } from 'antd';

const StyledForm = styled(Form)`
    .form-item {
        margin-bottom: 12px;
        span {
            font-size: 13px;
        }
    }
    .input-left-right {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .ant-form-item {
            padding: 0;
        }
    }
`;

export default StyledForm;