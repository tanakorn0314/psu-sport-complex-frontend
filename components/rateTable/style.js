import styled from 'styled-components';
import colors from '../../styles/colors';

const StyledTable = styled.table`
    color: ${colors.main2};
    border-collapse: separate;
    border-spacing: 1px;
    td {
        background-color: rgba(255, 255, 255, 0.9);
        padding: 3px 5px;
    }

    // .text {
    //     font-size: 10px;
    //     @media (min-width: 575px) {
    //         font-size: large;
    //     }
    // }
`;

export default StyledTable;