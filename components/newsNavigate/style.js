import styled from 'styled-components';
import { Row } from 'antd';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';

const StyledWrapper = styled(Row)`
    .content {
        font-family: ${fonts.psuStidti};
        font-size: 14px;
        color: ${colors.main2};
    }
    
    .content-right {
        text-align: right;
    }
    
    .nav-container {
        cursor: pointer;
        padding: 3px;
    }

    .nav-title {
        display: flex;
        align-items: center;
        color: ${colors.linkHover};
    }
    
    .nav-title-right {
        justify-content: flex-end;
    }

    .link {
        color: ${colors.linkHover};
    }
`

export default StyledWrapper;