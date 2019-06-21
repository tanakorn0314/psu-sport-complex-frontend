import styled from 'styled-components';
import { BannerTitle } from '../typo';

export const Img = styled.img`
    width: 100vw;
    height: calc(100vw * 0.4);
`

export const BannerContainer = styled.div`
    position: relative;
`

export const BannerContent = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.4);
`

export const ContentBox = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content : center;
`

export const Title = styled(BannerTitle)`
    color: white;
    text-align: center;
    padding: 0.3vw;
    font-size: 3em;
    @media(max-width: 575px) {
        font-size: calc(1vw + 2em);
    }
`