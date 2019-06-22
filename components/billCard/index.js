import React from 'react';
import { StyledRow, CourtDetailRow, StyledList, ViewButton } from './style';
import { Col, Collapse, List, Button } from 'antd';
import moment from 'moment';
import { H3, Text, TextButton } from '../typo';
import { withNamespaces, i18n, Router } from '../../i18n';
import { connect } from 'react-redux';
import ScreenAction from '../../redux/screen/actions';

const { Panel } = Collapse;

class BillCard extends React.Component {

    state = {
        showPanel: false
    }

    render() {
        const { showPanel } = this.state;
        const activeKey = showPanel ? 'panel' : '';
        const { dataSource } = this.props;
        const { bookings } = dataSource;

        return (
            <Collapse style={{ width: '100%', marginBottom: 10, position: 'relative' }} activeKey={activeKey}>
                <Panel key='panel' header={this.renderHeader()} showArrow={false} style={{ padding: 12 }}>
                    {this.renderCourtDetails(bookings)}
                </Panel>
                <ViewButton type='eye' onClick={(e) => { e.stopPropagation(); this.navigateBooking(bookings[0]) }}/>
            </Collapse>
        )
    }

    renderHeader = () => {
        const locale = i18n.language || 'en';
        const { t, dataSource } = this.props;
        const { bookingTime, balance, sport } = dataSource;

        return (
            <StyledRow gutter={{ sm: 0, md: 16 }} onClick={() => { this.togglePanel() }}>
                <Col sm={24} md={8} className='col basic-detail'>
                    <H3>{t('sport')}</H3>
                    <Text>{t(sport)}</Text>
                </Col>
                <Col sm={24} md={8} className='col basic-detail'>
                    <H3>{t('bookingTimestamp')}</H3>
                    <Text>{moment(bookingTime).locale(locale).format('DD MMMM YYYY HH:mm')}</Text>
                </Col>
                <Col sm={24} md={8} className='col basic-detail'>
                    <H3>{t('fee')}</H3>
                    <Text>{balance} {t('baht')}</Text>
                </Col>
            </StyledRow>
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
                    header={<H3>{t('court')} {num + 1}</H3>}
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
            <List.Item>
                <CourtDetailRow>
                    <Text>
                        {`${moment(startDate).locale(locale).format('DD MMMM YYYY HH:mm')} - ${moment(endDate).format('HH:mm')}`}
                    </Text>
                </CourtDetailRow>
            </List.Item>
        )
    }

    togglePanel = () => {
        const { showPanel } = this.state;
        this.setState({ showPanel: !showPanel });
    }

    handleEdit = item => {
        this.props.onEdit && this.props.onEdit(item);
    }

    navigateBooking = async item => {
        this.props.startLoad();

        const { stadiums } = this.props.Stadium;
        const date = moment(item.startDate).format('DD-MM-YYYY');
        const sport = stadiums.find(s => s.stadiumId === item.stadiumId).name;

        const params = `?sport=${sport}&date=${date}`;

        await Router.push(`/booking${params}`);

        this.props.endLoad();
    }
}

export default connect(state => state, ScreenAction)(withNamespaces('common')(BillCard));