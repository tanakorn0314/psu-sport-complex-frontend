import styled from 'styled-components';

const StyledWrapper = styled.div`
    padding: 16px;
    @media (min-width: 1024px) {
        margin: 0 25%;
    }
    .title {
        font-weight: 400;
    }
    .select-date {
        display: flex;
        justify-content: flex-start;
        @media (max-width: 575px) {
            padding: 0 5%;
            justify-content: center;
        }
    }
    .select-container {
        justify-content: flex-end;
        @media (max-width: 575px) {
            padding: 0 5%;
            .antd-select {
                width: 100%;
            }
        }
    }
    .select-container, .select-date {
        display: flex;
        margin: 10px 0;
        @media (max-width: 575px) {
            justify-content: center;
        }
    }
    .link-to-list {
        margin: 10px 0;
        position: relative;
    }
    .btn-container {
        display: flex;
        justify-content: center;
    }
    .input-upload {
        display: none;
    }
`;

export const ConfirmContainer = styled.div`
    input {
        margin-bottom: 10px;
        width: 100%;
    }
`;

export default StyledWrapper;