import React, { Component } from 'react';
import Banner from '../../../components/banner';

const bannerHeight = 400;

const imgUrl = [
  'https://static.wixstatic.com/media/84770f_697adeafbb59449b9921f8fe484cbf7d.jpg/v1/fill/w_944,h_819,al_c,q_85/84770f_697adeafbb59449b9921f8fe484cbf7d.webp',
  'https://static.wixstatic.com/media/84770f_3f0cee1368ee472ca51f970c1ae7ebbe.jpg/v1/fill/w_980,h_953,al_c,q_85,usm_0.66_1.00_0.01/84770f_3f0cee1368ee472ca51f970c1ae7ebbe.webp',
  'https://static.wixstatic.com/media/84770f_98e3c16564e8460f928638971295c790.jpg/v1/fill/w_980,h_735,al_c,q_85,usm_0.66_1.00_0.01/84770f_98e3c16564e8460f928638971295c790.webp'
];

class Home extends Component {

  render() {
    return (
      <>
        <Banner id='home' height={bannerHeight} img={imgUrl[0]} />
        {/* <h4 id='aoubt'>About</h4>
        <h4 id='services'>Services</h4>
        <h4 id='contact'>Contact</h4> */}
      </>
    )
  }
}

export default Home;