import styled from 'styled-components';

const StyledWrapper = styled.div`
    padding: 16px;
    @media (min-width: 1024px) {
        margin: 0 220px;
    }
    .title {
        text-align: center;
        font-weight: 600;
        font-size: 3em;
        margin: 0;
    }

    .content-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

export default StyledWrapper;