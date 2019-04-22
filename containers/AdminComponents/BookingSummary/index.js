import React from 'react';
import {
    Card,
    Row,
    Col,
    Button
} from 'antd';
import { connect } from 'react-redux';
import AdminAction from '../../../redux/admin/actions';
import { CSVLink } from 'react-csv';

const { dispatcher } = AdminAction;

class BookingSummary extends React.Component {

    render() {
        return (
            <Card>
                <Row type='flex' justify='space-between'>
                    <Col span={8}>
                        <span>Total : {this.props.Admin.fee} baht</span>
                    </Col>
                    <Col span={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <CSVLink data={this.props.Admin.csv} filename='booking-data.csv'>
                            <Button type='primary'>Export excel</Button>
                        </CSVLink>
                    </Col>
                </Row>
            </Card>
        )
    }

}

export default connect(state => state, dispatcher)(BookingSummary)