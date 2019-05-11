import styled from 'styled-components';
import { Row } from 'antd';

export const StyledRow = styled(Row)`
    padding-right: 12px;
    .col {
        height: 100%;
    }
    .basic-detail {
        border-right: solid 1px #cecece;
        h4 {
            margin: 0;
        }
        &:last-child {
            border-right: none;
        }
        @media (max-width: 575px) {
            border-right: none;
            border-top: solid 1px #cecece;
            padding-bottom: 3px;
            &:first-child {
                border-top: none;
            }
        }
    }
    .btn-container {
        width: 100%;
        display: flex;
    }
`;