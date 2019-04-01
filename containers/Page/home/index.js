import React, { Component } from 'react';
import StyleWrapper from './home.style';
import {
  Carousel
} from 'antd';
import imgFront from '../../../static/image/complex-frontview.jpg';
import imgTop from '../../../static/image/complex-topview.jpg';
import fitness from '../../../static/image/fitness.jpg';

const imgUrl = [
  imgFront,
  imgTop,
  fitness
];

class Home extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <StyleWrapper>
        <Carousel autoplay>
          {imgUrl.map((url, idx) => <img src={url} height={650} key={idx}/>)}
        </Carousel>
      </StyleWrapper>
    )
  }

}

export default Home;