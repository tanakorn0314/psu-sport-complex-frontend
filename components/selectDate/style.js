import styled from 'styled-components';

const StyledWrapper = styled.div`
    display: flex;
    width: 100%;
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