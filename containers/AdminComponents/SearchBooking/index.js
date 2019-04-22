import React from 'react';
import {
    Card,
    Form,
    Select,
    Row,
    Col,
    DatePicker,
    Input,
} from 'antd';
import moment from 'moment';
import { SelectStadium } from '../../BookingInputs';
import { connect } from 'react-redux';
import AdminAction from '../../../redux/admin/actions';

const { dispatcher } = AdminAction;
const { Option } = Select;

class SearchForm extends React.Component {

    render() {
        return (
            <Card {...this.props}>
                <Form layout='inline'>
                    <Row justify='space-between'>
                        <Col span={7} >
                            <Form.Item
                                label='Sports'
                            >
                                <SelectStadium onChange={this.selectStadium}/>
                            </Form.Item>
                        </Col>
                        <Col span={7} >
                            <Form.Item
                                label='Start'
                            >
                                <DatePicker defaultValue={moment()} onChange={this.selectStart} />
                            </Form.Item>
                        </Col>
                        <Col span={7} >
                            <Form.Item
                                label='End'
                            >
                                <DatePicker defaultValue={moment().add(1, 'day')} onChange={this.selectEnd}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row span={24}>
                        <Form.Item
                            label='First name'
                        >
                            <Input placeholder='First name' name='fname' style={{ width: '100%', minWidth: 120 }} onBlur={this.handleBlur}/>
                        </Form.Item>
                    </Row>
                    <Row span={24}>
                        <Form.Item
                            label='Phone number'
                        >
                            <Input placeholder='phone number' name='phoneNo'style={{ width: '100%', minWidth: 120 }} onBlur={this.handleBlur}/>
                        </Form.Item>
                    </Row>
                    <Row span={24}>
                        <Form.Item
                            label='Status'
                        >
                            <Select defaultValue='all' onChange={this.handleSelect} style={{ width: '100%', minWidth: 120 }}>
                                <Option value='unpaid'>Unpaid</Option>
                                <Option value='approved'>Approved</Option>
                                <Option value='all'>All</Option>
                            </Select>
                        </Form.Item>
                    </Row>
                </Form>
            </Card>
        )
    }

    handleBlur = e => {
        const { value, name } = e.target;

        switch(name) {
            case 'fname':
                this.props.filterName(value);
            break;
            case 'phoneNo':
                this.props.filterPhoneNumber(value)
            break;
        }
    }

    handleSelect = value => {
        this.props.filterStatus(value)
    }

    selectStart = start => {
        this.props.filterStart(start);
    }

    selectEnd = end => {
        this.props.filterEnd(end)
    }

    selectStadium = async () => {
        await this.props.refreshData();
    }
}

export default connect(
    state => state, 
    dispatcher
)(SearchForm)