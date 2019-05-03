import styled from 'styled-components';

const StyledWrapper = styled.div`
    display: flex;
    width: 100%;
    .ant-select {
        min-width: 40px;
        &:first-child {
            margin-right: 10px;
        }
        &:last-child {
            margin-left: 10px;
        }
    }
`;

export default StyledWrapper;