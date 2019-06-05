import styled from 'styled-components';
import { Select } from 'antd';
import fonts from '../../styles/fonts';

const StyledWrapper = styled.div`
    display: flex;
    width: 100%;
    font-family: ${fonts.psuStidti};
    .ant-select {
        &:first-child {
            margin-right: 10px;
        }
        &:last-child {
            margin-left: 10px;
        }
    }
`;

export default StyledWrapper;