import styled from 'styled-components';
import colors from '../../styles/colors';

const StyledWrapper = styled.div`
    input {
        margin-bottom: 10px;
        width: 100%;
    }
    .warning {
        color: ${colors.warning};
    }
`

export default StyledWrapper;