import styled from 'styled-components';

const StyledWrapper = styled.div`
    display: inline-flex;
    flex-direction: row;
    align-items: flex-start;
    ${props => props.mode === 'vertical' && `
        flex-direction: column;
    `}
`

export default StyledWrapper;