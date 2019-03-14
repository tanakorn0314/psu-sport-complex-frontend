import styled from 'styled-components';

const hoverColor = '#DBDB00';

const ButtonWrapper = styled.div`
    cursor: pointer;
    background-color: rgba(0,0,0,0);
    text-align: center;
    padding: 5px 10px 5px 10px;
    border: 2px solid #FFF;
    border-radius: 20px;
    max-width: 150px;
    color: #FFF;
    transition: border-color 0.4s ease 0s, background-color 0.4s ease 0s
    .container:hover {
        background-color: ${hoverColor};
        border-color: ${hoverColor};
    }
`;

export default ButtonWrapper;