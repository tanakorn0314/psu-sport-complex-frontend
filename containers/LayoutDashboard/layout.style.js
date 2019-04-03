import styled from 'styled-components';
import { Layout } from 'antd';

const StyledLayout = styled(Layout)`
    height: calc(100vh - 64px);

    .ant-menu > .ant-menu-item:first-child {
        margin-top: 0;
    }
`;

export default StyledLayout;