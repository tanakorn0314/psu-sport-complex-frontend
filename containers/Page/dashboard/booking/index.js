import React from 'react';
import {
    Card,
    Form,
    Select,
    Row,
    Col,
    DatePicker,
    Input,
    Table,
    Button
} from 'antd';
import StyledWrapper from './style';
import moment from 'moment';

const { Option } = Select;

class SearchForm extends React.Component {
    render() {
        return (
            <Card {...this.props}>
                <Form layout='inline'>
                    <Row justify='space-between'>
                        <Col xs={24} s={24} md={12} >
                            <Form.Item
                                label='Sports'
                            >
                                <Select defaultValue='tennis' onChange={this.handleChange} style={{ width: '100%', minWidth: 120 }}>
                                    <Option value='tennis'>Tennis</Option>
                                    <Option value='table tennis'>Table Tennis</Option>
                                    <Option value='basketball'>Basketball</Option>
                                    <Option value='valleyball'>Valleyball</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} s={24} md={12}>
                            <Form.Item
                                label='Start'
                            >
                                <DatePicker defaultValue={moment()} />
                            </Form.Item>
                            <Form.Item
                                label='End'
                            >
                                <DatePicker defaultValue={moment()} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row span={24}>
                        <Form.Item
                            label='Filter by'
                        >
                            <Select defaultValue='phone number' onChange={this.handleChange} style={{ width: '100%', minWidth: 120 }}>
                                <Option value='name'>Name</Option>
                                <Option value='phone number'>Phone Number</Option>
                                <Option value='status'>Status</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder='phone number' />
                        </Form.Item>
                    </Row>

                </Form>
            </Card>
        )
    }

    handleChange = value => {

    }
}

class BookingList extends React.Component {
    render() {
        const column = [{
            title: '#',
            dataIndex: 'no',
            key: 'no',
        }, {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'Phone No',
            dataIndex: 'phone',
            key: 'phone',
        }, {
            title: 'Court',
            dataIndex: 'court',
            key: 'court',
        }, {
            title: 'Start',
            dataIndex: 'start',
            key: 'start',
        }, {
            title: 'End',
            dataIndex: 'end',
            key: 'end',
        }, {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        }];
        const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => ({
            no: item,
            name: 'test',
            phone: '000',
            court: '1',
            start: moment().format('L'),
            end: moment().format('L'),
            status: 'unpaid'
        }))
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

class Summary extends React.Component {
    render() {
        return (
            <Card>
                <Row type='flex' justify='space-between'>
                    <Col span={8}>
                        <span>Total : 1000 baht</span>
                    </Col>
                    <Col span={8} style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button type='primary'>Export excel</Button>
                    </Col>
                </Row>
            </Card>
        )
    }
}

class Booking extends React.Component {
    render() {
        return (
            <StyledWrapper>
                <SearchForm style={{ marginBottom: 10 }} />
                <BookingList style={{ marginBottom: 10 }} />
                <Summary />
            </StyledWrapper>
        )
    }
}

export default Booking;