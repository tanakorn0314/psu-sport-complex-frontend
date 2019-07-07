import styled from 'styled-components';

const StyledWrapper = styled.div`
    background-color: #fff;
    padding: 10px 5%;
    .paginateContainer {
        display: flex;
        justify-content: flex-end;
        @media (max-width: 575px) {
            justify-content: center;
        }
    }
`;

export default StyledWrapper;