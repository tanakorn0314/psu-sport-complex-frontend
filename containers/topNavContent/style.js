import styled from 'styled-components';
import { Popover } from 'antd';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';

export const StyledPopover = styled(Popover)`
    .ant-popover-inner-content {
        padding: 12px 2px;
    }
    .lang-container {
        display: flex;
        align-items: center;
    }
`
export const A = styled.a`
    font-size: 16px;
    font-family: ${fonts.psuStidti};
    color: inherit;

    :hover {
        color: inherit;
    }
`
