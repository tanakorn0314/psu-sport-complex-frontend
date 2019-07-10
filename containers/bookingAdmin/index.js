import React from 'react';
import { Card, notification } from 'antd';
import { connect } from 'react-redux';
import BookingAction from '../../redux/booking/actions';
import { H2 } from '../../components/typo';
import { withNamespaces } from '../../i18n';
import _ from 'lodash';
import Button from '../../components/button';
import BookingAdminForm from '../bookingAdminForm';
import moment from 'moment';
import positions from '../../common/text/position'

class BookingAdmin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            stadiumId: 1,
            courtId: 1,
            startTime: moment().minute(0),
            endTime: moment().add(1, 'hour').minute(0),
            ownerName: '',
            ownerInfo: '',
            ownerPosition: positions[0]
        }
    }

    render() {
        const { t } = this.props;

        return (
            <Card style={this.props.style}>
                <H2 msg='booking' />
                <BookingAdminForm
                    {...this.state}
                    onChange={this.handleChange}
                    responsive
                />
                <Button type='primary' onClick={this.bookByAdmin} msg='book'/>
            </Card>
        )
    }

    bookByAdmin = async () => {
        const { t } = this.props;
        const { idToken, user } = this.props.Auth;
        const { stadiumId, courtId, startTime, endTime, ownerName, ownerInfo, ownerPosition } = this.state;

        const bookByAdminDTO = [{
            userId: user.userId,
            ownerName,
            ownerInfo,
            ownerPosition,
            stadiumId,
            courtId: courtId,
            startDate: moment(startTime).format(),
            endDate: moment(endTime).format()
        }]

        const result = await this.props.reserveByAdmin(idToken, bookByAdminDTO);

        if (result) {
            if (result.error) {
                notification['error']({
                    title: t('error'),
                    message: t(result.error),
                    duration: 3
                });
            } else {
                notification['success']({
                    title: t('success'),
                    message: t('bookingSuccess'),
                    duration: 3
                });
            }

        }

    }

    handleChange = (key, value) => {
        this.setState({ [key]: value });
    }

}

export default connect(
    state => state,
    BookingAction
)(withNamespaces('common')(BookingAdmin))