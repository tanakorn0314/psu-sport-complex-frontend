import React from 'react';
import NavLayout from '../present-layer/layout/layout_nav';
import { Table } from 'reactstrap';
import bookingService from '../core-layer/service/booking-service';
import { connect } from 'react-redux';
import cookies from 'next-cookies';
import Router from 'next/router';
import { withAuth } from '../container/withAuth';

class BookingList extends React.Component {
    static async getInitialProps(ctx) {
        const { userId } = ctx.query;
        const { accessToken } = cookies(ctx);
        const bookings = await bookingService.getByUserId(accessToken, userId);
        return {
            bookingList: bookings,
        }
    }

    render() {
        const { bookingList, accessToken } = this.props;
        return (
            <NavLayout accessToken={accessToken}>
                <div className='container'>
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
                            {bookingList.map((booking, index) => {
                                return (
                                <tr key={index} value={index} className='list-item' onClick={this.navigateConfirm}>
                                    <td value={index} >{index + 1}</td>
                                    <td value={index} >{booking.title}</td>
                                    <td value={index} >{booking.courtId}</td>
                                    <td value={index} >{booking.startDate}</td>
                                    <td value={index} >{booking.endDate}</td>
                                    <td value={index} >{booking.status}</td>
                                </tr>
                            )})}
                        </tbody>
                    </Table>
                    <div className='back'>
                        <a href='/' onClick={this.navigateBack}>Back</a>
                    </div>
                </div>
                <style jsx>{`
                    .container {
                        text-align: center
                    }
                    .back {
                        text-align: left
                    }
                    .list-item {
                        cursor: pointer;
                    }
                `}</style>
            </NavLayout>
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

export default withAuth(BookingList);