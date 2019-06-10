import React from 'react';
import StyleWrapper from './style';

import SectionStadium from '../../components/sectionStadium';
import SectionHead from '../../components/sectionHead';
import SectionFee from '../../containers/sectionFee';
import SectionContact from '../../components/sectionContact';

class Home extends React.Component {

  render() {
    return (
      <StyleWrapper>
        <SectionHead/>
        <SectionFee/>
        <SectionContact/>
      </StyleWrapper>
    )
  }

}

export default Home;