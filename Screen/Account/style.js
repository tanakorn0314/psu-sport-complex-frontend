import styled from 'styled-components';
import { Typography } from 'antd';
import fonts from '../../styles/fonts';

const { Text } = Typography;

const StyledWrapper = styled.div`
    padding: 16px;
    @media (min-width: 768px) {
        margin: 0 20%;
    }
    @media (min-width: 1024px) {
        margin: 0 25%;
    }
    .title {
        text-align: center;
        margin: 0;
    }

    table {
        border-collapse: separate; 
        border-spacing: 0 10px;
    }

    tr {
        background-color: #fff;
        padding: 20px;
        border-radius: 20px;
    }

    td:first-child { border-top-left-radius: 3px; }
    td:first-child { border-bottom-left-radius: 3px; }
    td:last-child { border-top-right-radius: 3px; }
    td:last-child { border-bottom-right-radius: 3px; }

    td {
        padding: 20px;
        border: solid 1px #fff;
    }
    .td-content {
        width: 60%;
        @media (max-width: 575px) {
            width: 50%;
        }
        @media (max-width: 768px) {
            width: 60%;
        }
    }
`;

export const EditableText = styled(Text)`
    font-family: ${fonts.psuStidti};
`

export default StyledWrapper;