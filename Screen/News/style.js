import styled from 'styled-components';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';

const StyledWrapper = styled.div`
    background-color: #fff;
    padding: 0 3%;

    .banner {
        position: relative;
        background: #000;

        .image {
            width: 100%;
            opacity: 0.7;
        }
        .title {
            position: absolute;
            bottom: 10px;
            left: 10px;
            color: white;
        }
    }
    .content-container {
        padding: 0 2%;
        .showtime {
            padding: 20px 0;
        }
        .content {
            padding: 0 10px;
            width: 100%
            p {
                font-family: ${fonts.dbChuanPim};
                color: ${colors.main2};
                font-size: 20px;
            }
        }
    }

    @media (max-width: 575px) {
        padding: 0;

        .content-container {
            padding: 0;
        }
    }
`

export default StyledWrapper;