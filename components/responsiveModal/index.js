import styled from 'styled-components';
import { Modal } from 'antd';

const ResponsiveModal = styled(Modal)`
    .ant-modal-body{
        padding-top: 12px;
        padding-left: 24px;
        padding-right: 24px;
        padding-bottom: 12px;
    }
    @media(max-width: 350px) {
        .ant-modal-header,.ant-modal-body{
            padding-left: 12px;
            padding-right: 12px;
        }
    }
`;

export default ResponsiveModal;