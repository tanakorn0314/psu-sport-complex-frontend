import styled from 'styled-components';
import { Row } from 'antd';
import colors from '../../styles/colors';

const StyledWrapper = styled(Row)`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 10px 5%;
    min-height: 52px;
    z-index: 100;

    -webkit-box-shadow: 0 -2px 8px ${colors.shadow};
    -webkit-box-shadow: 0 -2px 8px ${colors.shadow};
    box-shadow: 0 -2px 8px ${colors.shadow};

    @media (min-width: 1024px) {
        padding: 10px calc(25% + 16px);
    }

    .total {
        color: ${colors.main2};
        font-weight: 600;
        margin-bottom: 0;
    }

    .confirm {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
`;

export default StyledWrapper;