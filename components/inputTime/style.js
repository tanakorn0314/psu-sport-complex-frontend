import styled from 'styled-components';

const StyledWrapper = styled.div`
    display: flex;
    width: 100%;
    align-items: 'center';
    .ant-select {
        min-width: 62px;
        @media (max-width: 350px) {
            min-width: 52px;
        }
    }
`;

export default StyledWrapper;