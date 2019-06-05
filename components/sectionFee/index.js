import React from 'react';
import StyledWrapper from './style';
import imgFeeMember from '../../static/image/fee/fee_member.jpg';
import { Row, Col } from 'antd';

class SectionFee extends React.Component {
    render() {
        return (
            <StyledWrapper>
                <h3>Service fee</h3>
                <div className='row'>
                    <div className='col bigImg'>
                        <img src={imgFeeMember} width='99%' />
                    </div>
                    <div className='col smallImg'>
                        <div style={{backgroundColor: 'red', width: '100%'}}/>
                    </div>
                </div>
                {/* <Row gutter={8}>
                    <Col xs={24} sm={24} md={18}>
                        <img src={imgFeeMember} width='100%' />
                    </Col>
                    <Col xs={24} sm={24} md={6}>
                        <Row gutter={8} type='flex' justify='space-between'>
                            <Col xs={8} sm={8} md={24}>
                                <img src={imgFeeMember} width='100%' />
                            </Col>
                            <Col xs={8} sm={8} md={24}>
                                <img src={imgFeeMember} width='100%' />
                            </Col>
                            <Col  xs={8} sm={8} md={24}>
                                <img src={imgFeeMember} width='100%' />
                            </Col>
                        </Row>
                    </Col>
                </Row> */}
            </StyledWrapper>
        )
    }
}

export default SectionFee;