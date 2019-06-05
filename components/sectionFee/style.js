import styled from 'styled-components';
import imgFeeMember from '../../static/image/fee/fee_member.jpg';

const StyledWrapper = styled.div`
    .row {
        display: table;
        width: 100%;

        .bigImg {
            width: 81%;
        }

        .smallImg {
            width: 19%;
        }

        .smallImgs {
            display: flex;
            flex-direction: column;
            @media (max-width: 575px) {
                flex-diretion: row;
            }

            .imgContainer {
                flex: 1;
                display: flex;
                align-items: center;

                &:first-child {
                    align-items: flex-start;
                }
                &:last-child {
                    align-items: flex-end;
                }
            }
        }

        .col {
            display: table-cell;
            @media (max-width: 575px) {
                display: block;
                width: 100%;
                flex: unset;
            }
        }
    }
    
`;

export default StyledWrapper;