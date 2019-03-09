import React from 'react';
import { Table } from 'reactstrap';
import Router from 'next/router';
import withData from './withData';
import StyledWrapper from './style';

class BookingList extends React.Component {

    render() {
        const { bookingList = [] } = this.props;
        return (
            <StyledWrapper>
                <h1 className='title'>BOOKING LIST</h1>
                <Table hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>title</th>
                            <th>court</th>
                            <th>start</th>
                            <th>end</th>
                            <th>status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!bookingList.error ? bookingList.map((booking, index) => {
                            return (
                                <tr key={index} value={index} className='list-item' onClick={this.navigateConfirm}>
                                    <td value={index} >{index + 1}</td>
                                    <td value={index} >{booking.title}</td>
                                    <td value={index} >{booking.courtId}</td>
                                    <td value={index} >{booking.startDate}</td>
                                    <td value={index} >{booking.endDate}</td>
                                    <td value={index} >{booking.status}</td>
                                </tr>
                            )
                        }) : ''}
                    </tbody>
                </Table>
                <div className='back'>
                    <a href='/' onClick={this.navigateBack}>Back</a>
                </div>
            </StyledWrapper>
        )
    }

    navigateConfirm = e => {
        const value = e.target.getAttribute('value');
        Router.push(`/booking_confirm?id=${this.props.bookingList[value].bookingId}`);
    }

    navigateBack = e => {
        e.preventDefault();
        Router.back();
    }
}

export default withData(BookingList);