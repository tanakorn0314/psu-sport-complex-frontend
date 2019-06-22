import styled from 'styled-components';

const StyledWrapper = styled.div`
    display: inline-flex;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 3px;
    justify-content: center;
    align-items: center;

    .col {
        padding: 20px;
    }
`

export const Divider = styled.div`
    width: 1px;
    height: 80%;
    background-color: #cecece;
    margin: 5px 0;
`

export default StyledWrapper;