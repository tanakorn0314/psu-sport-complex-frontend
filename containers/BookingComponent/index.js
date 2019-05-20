import React from 'react';
import _ from 'lodash';
import BookingCard from '../BookingCard';
import dataHandler from './dataHandler';
import { connect } from 'react-redux';
import { Card } from 'antd';
import moment from 'moment';

class BookingComponent extends React.Component {

    render() {
        const { stadiumBooking, selectedDate } = this.props.Booking;
        const { operationTimes, blackoutSeries } = this.props.OperationTime;

        const operationTime = dataHandler.generateTimeIndex(selectedDate, operationTimes);
        if (!operationTime) {
            return (
                <Card style={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '50vh',
                    borderRadius: 5
                }}>
                    <h2 >
                        No service on {moment(selectedDate).format('dddd').toLowerCase()}s
                    </h2>
                </Card>
            )
        }

        const blackout = dataHandler.findBlackout(blackoutSeries, selectedDate);
        if (blackout) {
            return <Card style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
                borderRadius: 5
            }}>
                <h2 >
                    {blackout.title}, No service.
                </h2>
            </Card>
        }

        const bookingData = dataHandler.seperateDataByStartTime(stadiumBooking, selectedDate);
        return this.renderCards(bookingData, operationTime)
    }

    renderCards(bookingData, operationTime) {
        const { stadiumId } = this.props.Booking;
        const { stadiums } = this.props.Stadium;

        const stadium = stadiums[stadiumId - 1]
        const len = operationTime.length;
        const cards = [];

        for (let i = 1; i < len; i++) {
            const dataSource = {
                start: operationTime[i - 1],
                end: operationTime[i],
                numCourt: stadium.numCourt,
                bookingData: bookingData[operationTime[i - 1]]
            }
            cards.push(<BookingCard key={i} i={i} dataSource={dataSource} />)
        }

        return <div>{cards}</div>;
    }
}

export default connect(state => state)(BookingComponent);