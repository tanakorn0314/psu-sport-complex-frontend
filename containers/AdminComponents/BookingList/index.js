import React from 'react';
import {
    Card,
    Table,
} from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import AdminAction from '../../../redux/admin/actions';
import ModalAction from '../../../redux/modal/actions';

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
        },{
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },{
            title: 'Action',
            key: 'action',
            render: item => {
                const booking = displayBookings[item.key];
                console.log(booking);
                return (
                    <a href='#' onClick={() => {this.showEditModal(booking)}}>Edit</a>
                )
            }
        }];
        const data = displayBookings.map((booking, index) => {
                const { stadiums } = this.props.Stadium;
                const { ownerName, ownerInfo, stadiumId, courtId, startDate, endDate } = booking;
                const stadium = stadiums[stadiumId - 1];
                const userId = ownerInfo;

                const mStart = moment(startDate);
                const mEnd = moment(endDate);

                const format = mStart.isSame(mEnd, 'date') ? 'HH:mm' : 'DD/MM/YYYY HH:mm'

                return {
                    key: index,
                    userId,
                    no: index + 1,
                    name: ownerName,
                    stadium: `${stadium.name} ${courtId}`,
                    date: `${mStart.format('DD/MM/YYYY HH:mm')} - ${mEnd.format(format)}`,
                }
        })
        return (
            <Card style={this.props.style}>
                <Table
                    columns={column}
                    dataSource={data}
                />
            </Card>
        )
    }

    showEditModal = (booking) => {
        this.props.modalChangeSchedule(booking);
    }
}

export default connect(
    state => state,
    { ...AdminAction, ...ModalAction}
)(BookingList);