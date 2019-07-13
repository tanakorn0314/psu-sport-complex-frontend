import styled from 'styled-components';
import colors from '../../styles/colors';
import { Icon } from 'antd';

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

const StyledWrapper = styled.div`
    display: inline-flex;
    justify-content: center;
    width: 60%;

    .icon-container {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        border-radius: 100%;
        margin-right: 5px;
        &:last-child {
            margin-right: 0;
        }
        @media (max-width: 575px) {
            width: 32px;
            height: 32px;
        }
    }
    
    .youtube {
        background-color: #FF0000;
    }

    .map {
        background-color: ${colors.main3};
    }

    .fb {
        background-color: #3b5998;
    }
`;

export const StyledIconFont = styled(IconFont)`
    font-size: 24px;
    @media (max-width: 575px) {
        font-size: 16px;
    }
    color: white;
`

export const StyledIcon = styled(Icon)`
    font-size: 24px;
    @media (max-width: 575px) {
        font-size: 16px;
    }
    color: white;
`

export default StyledWrapper;