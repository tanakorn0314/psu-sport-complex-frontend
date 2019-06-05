import React from 'react';
import {
    Card,
    Row,
    Col,
    Button
} from 'antd';
import { connect } from 'react-redux';
import AdminAction from '../../redux/admin/actions';
import { CSVLink } from 'react-csv';
import { H2, TextButton } from '../../components/typo';
import text from '../../common/text';

class BookingSummary extends React.Component {

    render() {
        const { displayBookings } = this.props.Admin;
        const total = displayBookings.reduce((acc, booking) => acc + booking.fee, 0);

        return (
            <Card>
                <Row type='flex' justify='space-between' align='middle'>
                    <Col span={8}>
                        <H2 >{text['total']} : {total} {text['baht']}</H2>
                    </Col>
                    <Col span={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <CSVLink data={this.props.Admin.csv} filename='booking-data.csv'>
                            <Button type='primary'><TextButton msg='exportExcel'/></Button>
                        </CSVLink>
                    </Col>
                </Row>
            </Card>
        )
    }

}

export default connect(state => state, AdminAction)(BookingSummary)