import styled from 'styled-components';

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    .input-form {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .title {
        font-weight: 400;
    }
    .input, .input-date, .input-text {
        width: 100%;
        border-radius: 20px;
        border: 1px solid #dedede;
        padding: 5px 20px;
        margin: 10px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        outline: none;
    }
    .input:focus, input-date:focus {
        box-shadow: 0 0 1px 1px #46AFFF;
    }
    .input-date {
        width: 80%;
        padding: 3px 20px;
    }
    .input-text {
        width: 80%;
    }
    .link-to-list {
        margin-top: 20px;
        position: relative;
    }
`;

export default StyledWrapper;