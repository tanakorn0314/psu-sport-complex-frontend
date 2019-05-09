import styled from 'styled-components';
import { Layout } from 'antd';

const StyleLayout = styled(Layout)`
    min-height: 100vh;
    .header {
        position: relative;
        z-index: 1;
        -webkit-box-shadow: 0 2px 8px #a0a1a2;
        box-shadow: 0 2px 8px #a0a1a2;
        font-size: 1.3em;
        font-weight: 600;
        line-height: 64px;
    }

    .menu-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
`;

export default StyleLayout;