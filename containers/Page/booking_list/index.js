import React from 'react';
import {
    Table,
    Card,
    List,
    Tag,
    Button
} from 'antd';
import Router from 'next/router';
import Link from 'next/link';
import StyledWrapper from './style';
import { connect } from 'react-redux';
import moment from 'moment';
import { courts } from '../../../commonData';

const columns = [{
    title: '#',
    dataIndex: 'no',
}, {
    title: 'Title',
    dataIndex: 'title',
}, {
    title: 'Court',
    dataIndex: 'court',
}, {
    title: 'Start',
    dataIndex: 'start',
}, {
    title: 'End',
    dataIndex: 'end',
}, {
    title: 'Status',
    dataIndex: 'status',
}];

class BookingList extends React.Component {

    render() {
        const { myBookings } = this.props.Booking;
        const dataSource = myBookings.map((booking, index) => ({
            no: index + 1,
            title: booking.title,
            court: booking.courtId,
            start: moment(booking.startDate).format('MMMM Do YYYY, h:mm:ss a'),
            end: moment(booking.endDate).format('MMMM Do YYYY, h:mm:ss a'),
            status: booking.status
        }))
        return (
            <StyledWrapper>
                <h1 className='title'>BOOKING LIST</h1>
                <div className='table-container'>
                    {/* <Table
                        columns={columns}
                        dataSource={dataSource}
                    /> */}
                    <List
                        grid={{ gutter: 8, md: 2, lg: 4 }}
                        dataSource={dataSource}
                        renderItem={(booking, index) => {
                            let tagColor;
                            switch (booking.status) {
                                case 'paid': tagColor = 'green'; break;
                                case 'unpaid': tagColor = 'red'; break;
                                default: tagColor = 'black';
                            }
                            return (
                                <List.Item style={{cursor: 'pointer'}}>
                                    <Link href={`/booking_confirm?id=${myBookings[index].bookingId}`}>
                                        <Card>
                                            <div>Court : {courts[booking.court]}</div>
                                            <div>Start : {booking.start}</div>
                                            <div>End : {booking.end}</div>
                                            <Tag color={tagColor}>{booking.status}</Tag> <br />
                                        </Card>
                                    </Link>
                                </List.Item>
                            )
                        }}
                    />
                </div>
                <div className='back'>
                    <Button color='primary' onClick={this.navigateBack}>Back</Button>
                </div>
            </StyledWrapper >
        )
    }

    navigateConfirm = e => {
        // const value = e.target.getAttribute('value');
        // console.log(value);
        // const { myBookings } = this.props.Booking;
        // Router.push(`/booking_confirm?id=${myBookings[value].bookingId}`);
    }

    navigateBack = e => {
        e.preventDefault();
        Router.back();
    }
}

export default connect(state => state)(BookingList);