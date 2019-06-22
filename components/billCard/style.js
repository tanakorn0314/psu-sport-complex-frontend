import styled from 'styled-components';
import { Row, List, Icon } from 'antd';
import colors from '../../styles/colors';

export const StyledRow = styled(Row)`
    padding-right: 12px;
    .col {
        height: 100%;
    }
    .basic-detail {
        h4 {
            margin: 0;
        }
        border-top: solid 1px #cecece;
        padding-bottom: 3px;
            &:first-child {
                border-top: none;
            }
        @media(min-width: 768px) {
            border: none;
        }
    }
    .fee-detail {
        display: flex;
        .fee {
            flex: 2;
        }
        .action {
            flex: 1;
            display: flex;
            justify-content: flex-end;
            align-items: flex-start;
            @media (max-width: 575px) {
                align-items: flex-end;
            }
        }
    }
    .btn-container {
        width: 100%;
        display: flex;
    }
`;

export const CourtDetailRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
`
export const StyledList = styled(List)`
    ul.ant-list-items {
        padding-left: 0;
    }
`

export const ViewButton = styled(Icon)`
    position: absolute;
    top: 24px;
    right: 24px;
    color: ${colors.main1};
    font-size: 16px;
`