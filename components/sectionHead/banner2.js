import { BannerContainer, BannerContent, Img } from './style';
import { BannerTitle, TextButton } from '../typo';
import { Button } from 'antd';
import imgTop from '../../static/image/stadium/complex-topview.jpg';
import styled from 'styled-components';

const ContentBox = styled.div`
    position: absolute;
    right: 1vw;
    left: 1vw;
    top: 1vw;
`

const Title = styled(BannerTitle)`
    color: white;
    background-color: rgba(1,1,1,0.5);
    padding: 0.3vw;
`

const Banner1 = (props) => (
    <BannerContainer>
        <Img src={imgTop} />
        <BannerContent>
            <ContentBox>
                <Title>PSU Sport Complex</Title>
            </ContentBox>
        </BannerContent>
    </BannerContainer>
)

export default Banner1;