import React from 'react';
import StyledWrapper from './style';
import SectionFee from '../sectionFee';

class SectionStadium extends React.Component {
    render() {
        return (
            <StyledWrapper>
                <h1>Sport Stadiums</h1>
                <SectionFee />
            </StyledWrapper>
        )
    }
}

export default SectionStadium;