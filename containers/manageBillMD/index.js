import React from 'react';
import { connect } from 'react-redux';
import PubSub from 'pubsub-js';
import BillAction from '../../redux/bill/actions';
import StyledWrapper, { CourtDetailRow, StyledList, StyledListItem } from './style';
import { H3, Text, H4 } from '../../components/typo';
import { notification, List } from 'antd';
import { withNamespaces, i18n } from '../../i18n';
import moment from 'moment';
import BillService from '../../core/service/billService';
import Img from '../../components/image';

class ManageBill extends React.Component {

    componentDidMount() {
        this.token1 = PubSub.subscribe('approveBill', () => { this.approveBill() })
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.token1);
    }

    render() {

        const locale = i18n.language || 'en';
        const { t, bill, Stadium } = this.props;
        const { bookings } = bill;
        const { stadiums } = Stadium;
        const imageUrl = BillService.getImageUrl(bill.slipUrl);

        const stadium = stadiums.find(s => s.stadiumId === bookings[0].stadiumId)

        return (
            <StyledWrapper>
                <div>
                    <H3 msg='sport' />
                    <Text msg={t(stadium.name)} />
                    {this.renderCourtDetails(bookings)}
                </div>
                <div>
                    <H3 msg='paymentSlip' style={{ margin: '10px 0' }} />
                    <Img src={imageUrl} width='200px' />
                </div>
                <H3 style={{ marginTop: 10 }}>{t('serviceFee')} : {bill.fee} {t('baht')}</H3>
            </StyledWrapper>
        )
    }

    renderCourtDetails = (bookings) => {
        const { t } = this.props;
        const courtDetails = [];
        bookings.forEach((booking) => {
            const { courtId } = booking;
            if (!courtDetails[courtId - 1])
                courtDetails[courtId - 1] = [];
            courtDetails[courtId - 1].push(booking);
        });

        return courtDetails.map((courtDetail, num) => {
            return (
                <StyledList
                    key={num}
                    bordered
                    size='small'
                    header={<H4>{t('court')} {num + 1}</H4>}
                    dataSource={courtDetail}
                    renderItem={(item) => this.renderCourtDetail(item)}
                />
            )
        })
    }

    renderCourtDetail = (item) => {
        const locale = i18n.language || 'en';
        const { startDate, endDate } = item;

        return (
            <StyledListItem>
                <CourtDetailRow>
                    <Text>
                        {`${moment(startDate).locale(locale).format('DD MMMM YYYY HH:mm')} - ${moment(endDate).format('HH:mm')}`}
                    </Text>
                </CourtDetailRow>
            </StyledListItem>
        )
    }

    approveBill = async () => {
        const { t, bill } = this.props;

        const result = await this.props.approve(bill.billId);

        if (result && !result.error) {
            notification['success']({
                title: t('success'),
                message: t('approveSuccess'),
                duration: 3
            });

            await this.props.fetchBills()
            this.hideModal();
        }

        PubSub.publish('done');
    }

    hideModal = () => {
        PubSub.publish('hideModal');
    }

}

export default connect(state => state, BillAction)(withNamespaces('common')(ManageBill));