import styled from 'styled-components';
import {
    Row
} from 'antd';

const StyledWrapper = styled(Row)`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    background-color: #000;
    padding: 10px 5%;
    min-height: 68px;

    @media (min-width: 1024px) {
        padding: 10px calc(25% + 16px);
    }

    .total {
        color: #fff;
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