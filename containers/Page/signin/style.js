import styled from 'styled-components';

const SignInWrapper = styled.div`
    font-family: 'Roboto', sans-serif;
    display: flex;
    flex: 1;
    height: 100vh;
    justify-content: center;
    align-items: center;
    .header {
        font-size: 48px;
        font-weight: 400;
    }
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 800px;
        min-width: 300px;
    }
    .links {
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin-top: 20px;
    }
    .link {
        text-decoration: none;
    }
`;

export default SignInWrapper;