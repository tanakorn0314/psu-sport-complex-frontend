import React from 'react';
import { StyledRow, CourtDetailRow, StyledList } from './style';
import { Col, Collapse, List } from 'antd';
import moment from 'moment';
import { H3, Text, TextButton } from '../typo';
import { i18n } from '../../i18n';
import Button from '../../components/button';
import { withNamespaces } from '../../i18n';

const locale = i18n.language;

const { Panel } = Collapse;

class BillCard extends React.Component {
    render() {
        return (
            <Collapse style={{ width: '100%', marginBottom: 10 }}>
                <Panel header={this.renderHeader()} showArrow={false} style={{ padding: 12 }}>
                    {this.renderCourtDetails(this.props.dataSource.bookings)}
                </Panel>
            </Collapse>
        )
    }

    renderHeader = () => {
        const { t, dataSource } = this.props;
        const { bookingTime, balance, sport } = dataSource;

        return (
            <StyledRow gutter={{ sm: 0, md: 16 }} >
                <Col sm={24} md={8} className='col basic-detail'>
                    <H3>{t('sport')}</H3>
                    <Text>{t(sport)}</Text>
                </Col>
                <Col sm={24} md={8} className='col basic-detail'>
                    <H3>{t('bookingTimestamp')}</H3>
                    <Text>{bookingTime.locale(locale).format('DD MMMM YYYY HH:mm')}</Text>
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
        const { t } = this.props;
        const { startDate, endDate } = item;
        const isPassed = moment(startDate).diff(moment()) <= 0;

        return (
            <List.Item>
                <CourtDetailRow>
                    <Text>
                        {`${moment(startDate).locale(locale).format('DD MMMM YYYY HH:mm')} - ${moment(endDate).format('HH:mm')}`}
                    </Text>
                    <Button size='small' onClick={() => {this.handleEdit(item)}} disabled={isPassed}><TextButton>{t('edit')}</TextButton></Button>
                </CourtDetailRow>
            </List.Item>
        )
    }

    handleEdit = item => {
        this.props.onEdit && this.props.onEdit(item);
    }
}

export default withNamespaces('common')(BillCard);