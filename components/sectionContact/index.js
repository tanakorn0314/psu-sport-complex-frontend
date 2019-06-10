import React from 'react';
import StyledWrapper from './style';
import { H1 } from '../typo';
import Map from '../map'
import FacebookEmbed from '../facebookEmbed';

class SectionContact extends React.Component {
    render() {
        return (
            <StyledWrapper>
                <H1 msg='contactUs' />
                <div className='content'>
                    <Map />
                </div>

            </StyledWrapper>
        )
    }
}

export default SectionContact;