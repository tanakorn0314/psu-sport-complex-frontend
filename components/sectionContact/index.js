import React from 'react';
import StyledWrapper from './style';
import { H1 } from '../typo';
import ContactCard from '../contactCard';
import Map from '../map'
import { Row, Col } from 'antd';
import FacebookEmbed from '../facebookEmbed';

class SectionContact extends React.Component {
    render() {
        return (
            <StyledWrapper>
                <H1 msg='contactUs' />
                <Row>
                    <Col sm={24} md={8}>
                        <FacebookEmbed />
                    </Col>
                    <Col sm={24} md={16}>
                        <div className='stack'>
                            <ContactCard />
                        </div>
                        <div className='stack'>
                            <Map />
                        </div>
                    </Col>
                </Row>
            </StyledWrapper>
        )
    }
}

export default SectionContact;