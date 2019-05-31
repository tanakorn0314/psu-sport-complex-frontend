import styled from 'styled-components';
import { Modal } from 'antd';

const ResponsiveModal = styled(Modal)`
    @media(max-width: 350px) {
        .ant-modal-header,.ant-modal-body{
            padding-left: 12px;
            padding-right: 12px;
        }
    }
`;

export default ResponsiveModal;