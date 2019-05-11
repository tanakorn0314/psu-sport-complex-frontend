import React from 'react';
import { StyledRow } from './style';
import {  Col, Collapse, List } from 'antd';
import moment from 'moment';

const { Panel } = Collapse;

class BillCard extends React.Component {
    render() {
        return (
            <Collapse style={{ width: '100%', marginBottom: 10 }}>
                <Panel header={this.renderHeader()} showArrow={false} style={{padding: 12}}>
                    {this.renderCourtDetails(this.props.dataSource.bookings)}
                </Panel>
            </Collapse>
        )
    }

    renderHeader = () => {
        const {
            bookingTime,
            balance,
            sport
        } = this.props.dataSource;

        return (
            <StyledRow gutter={{sm: 0, md: 16}} >
                <Col sm={24} md={8} className='col basic-detail'>
                    <h4>Sport</h4>
                    <div>{sport.charAt(0).toUpperCase() + sport.slice(1)}</div>
                </Col>
                <Col sm={24} md={8} className='col basic-detail'>
                    <h4>Booking Time</h4>
                    <div>{bookingTime.format('LLL')}</div>
                </Col>
                <Col sm={24} md={8} className='col basic-detail'>
                    <h4>Fee</h4>
                    <div>{balance} Baht</div>
                </Col>
            </StyledRow>
        )
    }

    renderCourtDetails = (bookings) => {
        const courtDetails = [];
        bookings.forEach((booking, index) => {
            const { courtId } = booking;
            if (!courtDetails[courtId - 1])
                courtDetails[courtId - 1] = [];
            courtDetails[courtId - 1].push(booking.startDate);
        })
        return courtDetails.map((courtDetail, num) => {
            return (
                <List
                    key={num}
                    header={<h4 style={{marginBottom: 0}}>{`Court ${num + 1}`}</h4>}
                    dataSource={courtDetail}
                    renderItem={item => this.renderCourtDetail(item)}
                />
            )
        })
    }

    renderCourtDetail = (item) => {
        const endTime = moment(item).clone().add(30, 'minutes');
        return (
            <List.Item>
                <div>
                    {`${moment(item).parseZone().format('MMMM D, YYYY HH:mm')} - ${endTime.parseZone().format('HH:mm')}`}
                </div>
            </List.Item>
        )
    }
}

export default BillCard;