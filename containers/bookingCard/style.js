import styled from 'styled-components';
import { Row } from 'antd';
import colors from '../../styles/colors';

const StyledRow = styled(Row)`
    border: solid 1px #cecece;
    border-bottom: 0;
    width: 100%;
    padding: 20px;
    background-color: #fff;
    @media (max-width: 325px) {
        padding: 5px;
    }
    &:first-child {
        border-radius: 5px 5px 0 0;
    }
    &:last-child {
        border-radius: 0 0 5px 5px;
        border-bottom: solid 1px #cecece;
    }
    
    .duration {
        display: flex;
        .line-container {
            display: flex;
            flex: 1;
            padding: 0 16px;
            justify-content: center;
            align-items: center;
            .line {
                flex: 1;
                width: 100%;
                height: 1.2px;
                background-color: #cecece;
            }
        }
    }

    .slot-container {
        display: flex;
        padding: 10px;
    }

    .check {
        width: 20px;
        height: 20px;
        position: absolute;
        right: 5px;
        bottom: 5px;
        color: ${colors.available};
        font-size: 20px;
    }
`;

export default StyledRow;