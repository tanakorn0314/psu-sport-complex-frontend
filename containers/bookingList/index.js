import React from 'react';
import {
    Card,
    Table,
} from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import AdminAction from '../../redux/admin/actions';
import ModalAction from '../../redux/modal/actions';
import text, { locale } from '../../common/text';
import fonts from '../../styles/fonts';
import { H2 } from '../../components/typo';

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
            title: text['name'],
            dataIndex: 'name',
            key: 'name',
        }, {
            title: text['phoneNumberOrPSUPassport'],
            dataIndex: 'userId',
            key: 'userId',
        }, {
            title: text['stadium'],
            dataIndex: 'stadium',
            key: 'stadium',
        },{
            title: text['date'],
            dataIndex: 'date',
            key: 'date',
        },{
            title: text['action'],
            key: 'action',
            render: item => {
                const booking = displayBookings[item.key];
                return (
                    <a href='#' onClick={() => {this.showEditModal(booking)}}>{text['edit']}</a>
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

                const format = mStart.isSame(mEnd, 'date') ? 'HH:mm' : 'DD MMM YYYY HH:mm'

                return {
                    key: index,
                    userId,
                    no: index + 1,
                    name: ownerName,
                    stadium: `${text[stadium.name]} ${courtId}`,
                    date: `${mStart.locale(locale).format('DD MMM YYYY HH:mm')} - ${mEnd.locale(locale).format(format)}`,
                }
        })
        return (
            <Card style={this.props.style}>
                <H2 msg='bookingList'/>
                <Table
                    columns={column}
                    dataSource={data}
                    style={{fontFamily: fonts.psuStidti}}
                />
            </Card>
        )
    }

    showEditModal = (booking) => {
        this.props.showEditBookingModal(booking);
    }
}

export default connect(
    state => state,
    { ...AdminAction, ...ModalAction}
)(BookingList);