import styled from 'styled-components';
import colors from '../../styles/colors';

const StyledWrapper = styled.div`
    position: relative;
    .image {
        width: 100%;
        height: 350px
        @media (max-width: 525px) {
            height: 60vw;
        }
    }
`
export const Content = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;

    .title {
        color: ${colors.main2};
    }

    .left-container {
        width: 30%;
        position: relative;
        .sport-banner {
            position: absolute;
            top: 5%;
            left: 0;
            padding-left: 5%;
            padding-top: 1%;
            padding-bottom: 1%;
            padding-right: 2%;
            background-color: rgba(255, 255, 255, 0.9);
        }
        .btn-book {
            position: absolute;
            bottom: 5%;
            left: 5%;
        }
    }

    .right-container {
        width: 70%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

export default StyledWrapper;