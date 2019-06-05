import styled from 'styled-components';
import { Layout } from 'antd';
import colors from '../../styles/colors';

const cl = {
    topbar: colors.light1,
    footer: colors.main1
}

const { Header, Content, Footer } = Layout;

const StyleLayout = styled(Layout)`
    min-height: 100vh;

    .header {
        z-index: 200;
    }
    .menu-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
`;

export const StyledHeader = styled(Header)`
    position: relative;
    z-index: 1;
    -webkit-box-shadow: 0 2px 8px #a0a1a2;
    box-shadow: 0 2px 8px #a0a1a2;
    font-size: 1.3em;
    font-weight: 600;
    line-height: 64px;
    background-color: ${cl.topbar};
`

export const StyledContent = styled(Content)`
`

export const StyledFooter = styled(Footer)`
    text-align: center;
    background-color: ${cl.footer};
    font-family: 'db_chuanpim_psu_bd';
`

export default StyleLayout;