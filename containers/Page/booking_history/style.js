import styled from 'styled-components';
import { Modal } from 'antd';

const StyledWrapper = styled.div`
    padding: 16px;
    @media (min-width: 1024px) {
        margin: 0 25%;
    }
    .title {
        text-align: center;
        font-size: 3em;
        font-weight: 600;
        margin: 0;
    }

    .content-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
    }
`;

export const ResponsiveModal = styled(Modal)`
    @media(max-width: 350px) {
        .ant-modal-header,.ant-modal-body{
            padding-left: 12px;
            padding-right: 12px;
        }
    }
`

export default StyledWrapper;