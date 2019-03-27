import styled from 'styled-components';

const StyledWrapper = styled.div`
    overflow-x: hidden;
    .row {
        padding: 20px;
        @media(max-width: 425px) {
            padding: 0px;
        }
        .col {
            @media(min-width: 1024px) {
                display: flex;
                justify-content: center;
            }
        }
        .action {
            display: flex;
            flex-direction: column;
            align-items: center;
            @media(min-width: 1024px) {
                justify-content: center;
            }
    
            .action-col {
                display: flex;
                justify-content: center;
                margin: 5px 0;
            }
        }
    }
    .title {
        font-weight: 400;
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