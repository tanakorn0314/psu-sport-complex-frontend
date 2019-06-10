import styled from 'styled-components';
import colors from '../../styles/colors';

const StyledWrapper = styled.div`
    display: inline-flex;
    flex-direction: ${props => props.mode === 'horizontal' ? 'row' : 'column'};
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 5px;
    .img {
        width: 24px;
        ${props => props.mode === 'horizontal' && `margin-right: 3px`};
        ${props => props.mode !== 'horizontal' && `margin-bottom: 3px`};
    }
    .label {
        cursor: pointer;
        font-size: 13px;
        text-align: center;
        ${props => props.selected && `color: ${colors.linkHover}`};
    }
    :hover {
        .label {
            color: ${colors.linkHover};
        }
    }

    @media (min-width: 575px) {
        .img {
            width: 32px;
            ${props => props.mode === 'horizontal' && `margin-right: 10px`};
            ${props => props.mode !== 'horizontal' && `margin-bottom: 10px`};
        }
        .label {
            font-size: 22px;
        }
    }
`;

export default StyledWrapper;