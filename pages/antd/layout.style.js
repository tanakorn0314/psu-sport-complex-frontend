import styled from 'styled-components';
import { Layout } from 'antd';

const StyledLayout = styled(Layout)`
    min-height: 100vh;

    .header {
        z-index: 1;
        background-color: white;
        border-bottom: 1px solid #e8e8e8;
        width: 100%;
        .logo {
            float: left;
            width: 100px;
            height: 64px;
            background-color: black;
        }
        .menu {
            line-height: 62px;
        }
    }

    .content {
        padding: 20px;
    }

    .footer {
        text-align: center;
    }
`

export default StyledLayout;