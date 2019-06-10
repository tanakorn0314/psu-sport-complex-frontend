import React from 'react';
import Banner1 from './banner1';
import Banner2 from './banner2';
import Banner3 from './banner3';
import { Carousel } from 'antd';

const contents = [
    <Banner1 key={0}/>,
    <Banner2 key={1}/>,
    <Banner3 key={2}/>
]

class SectionHead extends React.Component {

  render() {
    return (
        <Carousel autoplay>
          {contents}
        </Carousel>
    )
  }

}

export default SectionHead;