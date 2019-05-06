import React from 'react';
import enquire from 'enquire-js';
import {
    Table,
    Card,
    List,
    Button
} from 'antd';
import StatusTag from '../../../components/statusTag';
import Router from 'next/router';
import Link from 'next/link';
import StyledWrapper from './style';
import { connect } from 'react-redux';
import moment from 'moment';
import { courts } from '../../../commonData';

const columns = [{
    title: '#',
    dataIndex: 'no',
    key: 'no'
}, {
    title: 'Court',
    dataIndex: 'court',
    key: 'court'
}, {
    title: 'Start',
    dataIndex: 'start',
}, {
    title: 'End',
    dataIndex: 'end',
}, {
    title: 'Status',
    dataIndex: 'status',
    render: status => (
        <StatusTag status={status} />
    )
}];

class BookingList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isMobile: false,
            isLoading: true
        }
    }

    componentDidMount() {
        enquire.register('screen and (max-width:425px)', {
            match: () => {
                this.setState({ isMobile: true })
            },
            unmatch: () => {
                this.setState({ isMobile: false })
            }
        })

        this.setState({ isLoading: false });
    }

    componentWillUnmount() {
        enquire.unregister('screen and (max-width:425px)');
    }

    render() {
        const {
            isLoading,
            isMobile
        } = this.state;
        const { myBookings } = this.props.Booking;
        const dataSource = myBookings.map((booking, index) => ({
            no: index + 1,
            court: courts[booking.courtId],
            start: moment(booking.startDate).format('MMMM Do YYYY, h:mm:ss a'),
            end: moment(booking.endDate).format('MMMM Do YYYY, h:mm:ss a'),
            status: booking.status
        }));
        return (
            !isLoading && <StyledWrapper>
                <h1 className='title'>BOOKING LIST</h1>
                <div className='table-container'>
                    {
                        isMobile ?
                            <Table
                                columns={columns}
                                dataSource={dataSource}
                                onRowClick={this.navigateConfirm}
                            /> :
                            <List
                                grid={{ gutter: 8, md: 2, lg: 4 }}
                                dataSource={dataSource}
                                renderItem={(booking, index) => {
                                    return (
                                        <List.Item style={{ cursor: 'pointer' }}>
                                            {/* <Link href={`/booking_confirm?id=${myBookings[index].bookingId}`}> */}
                                            <Link href='#'>
                                                <Card>
                                                    <div>Court : {booking.court}</div>
                                                    <div>Start : {booking.start}</div>
                                                    <div>End : {booking.end}</div>
                                                    <StatusTag status={booking.status} /> <br />
                                                </Card>
                                            </Link>
                                        </List.Item>
                                    )
                                }}
                            />
                    }

                </div>
                <div className='back'>
                    <Button color='primary' onClick={this.navigateBack}>Back</Button>
                </div>
            </StyledWrapper >
        )
    }

    navigateConfirm = row => {
        // const { myBookings } = this.props.Booking;
        // Router.push(`/booking_confirm?id=${myBookings[row.no - 1].bookingId}`);
    }

    navigateBack = e => {
        e.preventDefault();
        Router.back();
    }
}

export default connect(state => state)(BookingList);