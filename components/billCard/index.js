import React from 'react';
import { StyledRow, CourtDetailRow, StyledList } from './style';
import { Col, Collapse, List, Button } from 'antd';
import moment from 'moment';
import { H3, Text, TextButton } from '../typo';
import { withNamespaces, i18n, Router } from '../../i18n';
import { connect } from 'react-redux';

const { Panel } = Collapse;

class BillCard extends React.Component {

    state = {
        showPanel: false
    }

    render() {
        const { showPanel } = this.state;
        const activeKey = showPanel ? 'panel' : '';
        return (
            <Collapse style={{ width: '100%', marginBottom: 10 }} activeKey={activeKey}>
                <Panel key='panel' header={this.renderHeader()} showArrow={false} style={{ padding: 12 }}>
                    {this.renderCourtDetails(this.props.dataSource.bookings)}
                </Panel>
            </Collapse>
        )
    }

    renderHeader = () => {
        const locale = i18n.language || 'en';
        const { t, dataSource } = this.props;
        const { bookingTime, balance, sport, bookings } = dataSource;

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
                <Col sm={24} md={8} className='col basic-detail fee-detail'>
                    <div className='fee'>
                        <H3>{t('fee')}</H3>
                        <Text>{balance} {t('baht')}</Text>
                    </div>
                    <div className='action'>
                        <Button size='small' onClick={(e) => { e.stopPropagation(); this.navigateBooking(bookings[0]) }}><TextButton>{t('view')}</TextButton></Button>
                    </div>
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
        const { t } = this.props;
        const { startDate, endDate, status } = item;
        const isApproved = status === 'approved';
        const isPassed = moment(startDate).diff(moment()) <= 0;

        const cantEdit = !isApproved || isPassed;

        return (
            <List.Item>
                <CourtDetailRow>
                    <Text>
                        {`${moment(startDate).locale(locale).format('DD MMMM YYYY HH:mm')} - ${moment(endDate).format('HH:mm')}`}
                    </Text>
                    <Button size='small' onClick={() => { this.handleEdit(item) }} disabled={cantEdit}><TextButton>{t('edit')}</TextButton></Button>
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

    navigateBooking = item => {
        const { stadiums } = this.props.Stadium;
        const date = moment(item.startDate).format('DD-MM-YYYY');
        const sport = stadiums.find(s => s.stadiumId === item.stadiumId).name;

        const params = `?sport=${sport}&date=${date}`;

        Router.push(`/booking${params}`);
    }
}

export default connect(state => state)(withNamespaces('common')(BillCard));