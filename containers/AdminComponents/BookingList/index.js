import React from 'react';
import {
    Card,
    Table,
} from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import AdminAction from '../../../redux/admin/actions';

const { dispatcher } = AdminAction;

class BookingList extends React.Component {

    componentDidMount() {
        this.props.refreshData();
    }

    render() {
        const { displayBookings } = this.props.Admin;
        const column = [{
            title: '#',
            dataIndex: 'no',
            key: 'no',
        }, {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'Phone No',
            dataIndex: 'phone',
            key: 'phone',
        }, {
            title: 'Court',
            dataIndex: 'court',
            key: 'court',
        }, {
            title: 'Start',
            dataIndex: 'start',
            key: 'start',
        }, {
            title: 'End',
            dataIndex: 'end',
            key: 'end',
        }, {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        }];
        const data = displayBookings.map((booking, index) => ({
            no: index + 1,
            key: index,
            name: booking.owner.fname,
            phone: booking.owner.phoneNumber,
            court: booking.courtId,
            start: moment(booking.startDate.slice(0, 16)).format('LLL'),
            end: moment(booking.endDate.slice(0, 16)).format('LLL'),
            status: booking.status,
        }))
        return (
            <Card {...this.props}>
                <Table
                    columns={column}
                    dataSource={data}
                />
            </Card>
        )
    }
}

export default connect(state => state, dispatcher)(BookingList);