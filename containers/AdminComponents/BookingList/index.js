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
            title: 'Phone Number / PSU Passport',
            dataIndex: 'userId',
            key: 'userId',
        }, {
            title: 'Stadium',
            dataIndex: 'stadium',
            key: 'stadium',
        }, {
            title: 'Play Date',
            dataIndex: 'playDate',
            key: 'playDate',
        }, {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
        },{
            title: 'Fee',
            dataIndex: 'fee',
            key: 'fee',
        }];
        const data = displayBookings.map((booking, index) => {
                const { stadiums } = this.props.Stadium;
                const { ownerName, ownerInfo, ownerPosition, stadiumId, courtId, startDate, endDate } = booking;
                const stadium = stadiums[stadiumId - 1];
                const userId = ownerInfo;
                const startTime = moment(startDate).parseZone().format('HH:mm');
                const endTime = moment(endDate).parseZone().format('HH:mm');
                return {
                    no: index + 1,
                    key: index,
                    name: ownerName,
                    userId,
                    stadium: `${stadium.name} ${courtId}`,
                    playDate: moment(startDate).parseZone().format('MMMM DD, YYYY'),
                    time: `${startTime} - ${endTime}`,
                    fee: booking.fee
                }
        })
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