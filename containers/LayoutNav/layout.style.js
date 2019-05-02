import styled from 'styled-components';
import { Layout } from 'antd';

const StyleLayout = styled(Layout)`
    min-height: 100vh;
    .header {
        background-color: white;
    }

    .menu-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
`;

export default StyleLayout;