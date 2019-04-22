import styled from 'styled-components';
import {
    Row
} from 'antd';

const StyledWrapper = styled(Row)`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    padding: 10px 100px;

    .total {
        color: #fff;
        font-weight: 600;
    }

    .confirm {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    @media (max-width: 425px) {
        padding: 10px 0px;
        justify-content: center;
        align-items: center;
        .total {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .confirm {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
`;

export default StyledWrapper;