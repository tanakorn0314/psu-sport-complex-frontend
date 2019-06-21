import React from 'react';
import { withNamespaces } from '../../i18n';
import BookingBanner from '../bookingBanner';
import imgTop from '../../static/image/stadium/complex-topview.jpg';
import {
  BannerContainer,
  BannerContent,
  Img,
  ContentBox,
  Title
} from './style';

class SectionHead extends React.Component {

  render() {
    const { t } = this.props;
    return (
      <BannerContainer>
        <Img src={imgTop} />
        <BannerContent>
          <ContentBox>
            <Title>Sport Complex PSU Phuket</Title>
            <BookingBanner/>
          </ContentBox>
        </BannerContent>
      </BannerContainer>
    )
  }

}

export default withNamespaces('common')(SectionHead);