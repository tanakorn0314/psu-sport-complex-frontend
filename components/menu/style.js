import styled from 'styled-components';
import colors from '../../styles/colors';

const StyledWrapper = styled.div`
    display: ${props => props.mode === 'inline' ? 'block' : 'flex'};
    height: ${props => props.mode === 'inline' ? 'unset' : '64px'};
`

export const StyledItem = styled.div`
    cursor: pointer;
    padding: ${props => props.mode === 'inline' ? '8px 12px' : '0 8px'};
    background-color: ${props => props.selected ? colors.main1 : colors.light1};
    color: ${props => props.selected ? colors.light1 : colors.main1};
    hover: {
        color: ${colors.linkHover}
    }
`

export default StyledWrapper;