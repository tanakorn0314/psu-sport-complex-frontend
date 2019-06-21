import styled from 'styled-components';
import colors from '../../styles/colors';

const StyledWrapper = styled.div`
    display: inline-flex;
`;

export const LangLabel = styled.span`
    display: inline-flex;
    align-items: center;
    padding: 1px;
    color: #cecece;
    ${props => props.active && `
        color: ${colors.main1};
    `}
`

export default StyledWrapper;