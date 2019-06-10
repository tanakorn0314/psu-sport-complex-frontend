import React from 'react';
import StyledWrapper from './style';
import SectionFee from '../../containers/sectionFee';
import { H1 } from '../../components/typo';

class SectionStadium extends React.Component {
    render() {
        return (
            <StyledWrapper>
                <H1 className='title' msg='sportStadium'/>
                <SectionFee />
            </StyledWrapper>
        )
    }
}

export default SectionStadium;