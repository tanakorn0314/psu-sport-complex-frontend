import React from 'react';
import StyleWrapper from './style';

import SectionNews from '../../containers/sectionNews';
import SectionStadium from '../../components/sectionStadium';
import SectionHead from '../../components/sectionHead';
import SectionFee from '../../containers/sectionFee';
import SectionContact from '../../components/sectionContact';
import SectionParallex from '../../components/sectionParallex';

class Home extends React.Component {

  render() {
    return (
      <StyleWrapper>
        <SectionHead/>
        <SectionNews/>
        {/* <SectionParallex/> */}
        <SectionFee/>
        {/* <SectionContact/> */}
      </StyleWrapper>
    )
  }

}

export default Home;