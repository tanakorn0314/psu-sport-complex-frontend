import styled from 'styled-components';

const StyledWrapper = styled.div`
    padding: 16px;
    @media (min-width: 1024px) {
        margin: 0 220px;
    }
    .title {
        font-weight: 400;
    }
    .select-container {
        display: flex;
        margin: 10px 0;
        justify-content: flex-end;
    }
    .link-to-list {
        margin: 10px 0;
        position: relative;
    }
    .btn-container {
        display: flex;
        justify-content: center;
    }
`;

export default StyledWrapper;