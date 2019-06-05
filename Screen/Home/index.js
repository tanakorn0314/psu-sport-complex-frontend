import React from 'react';
import StyleWrapper from './style';
import {
  Carousel
} from 'antd';

import SectionNews from '../../components/sectionNews';
import SectionStadium from '../../components/sectionStadium';

import imgFront from '../../static/image/stadium/complex-frontview.jpg';
import imgTop from '../../static/image/stadium/complex-topview.jpg';
import fitness from '../../static/image/stadium/fitness.jpg';

const imgUrl = [
  imgFront,
  imgTop,
  fitness
];

class Home extends React.Component {

  componentDidMount() {

  }

  render() {
    return (
      <StyleWrapper>
        <Carousel autoplay>
          {imgUrl.map((url, idx) => <img src={url} width='100%' key={idx}/>)}
        </Carousel>
        <SectionNews/>
        <SectionStadium/>
      </StyleWrapper>
    )
  }

}

export default Home;