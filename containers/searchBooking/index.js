import React from 'react';
import {
    Card,
    Form,
    Row,
    Col,
} from 'antd';
import moment from 'moment';

import { connect } from 'react-redux';
import AdminAction from '../../redux/admin/actions';

import Input from '../../components/input';
import DatePicker from '../../components/datePicker';
import SelectStadium from '../selectStadium';
import { Label, H2 } from '../../components/typo';
import text, { locale } from '../../common/text';

class SearchForm extends React.Component {

    render() {
        return (
            <Card style={this.props.style}>
                <H2 msg='searchBooking'/>
                <Form layout='inline'>
                    <Row justify='space-between'>
                        <Col span={8} >
                            <Form.Item
                                label={<Label msg='sport'/>}
                            >
                                <SelectStadium onChange={this.selectStadium} enableAll/>
                            </Form.Item>
                        </Col>
                        <Col span={7} >
                            <Form.Item
                                label={<Label msg='start'/>}
                            >
                                <DatePicker 
                                    defaultValue={moment().locale(locale)} 
                                    onChange={this.selectStart} 
                                    format='DD MMMM YYYY'
                                />
                            </Form.Item>
                        </Col>
                        <Col span={7} >
                            <Form.Item
                                label={<Label msg='end'/>}
                            >
                                <DatePicker 
                                    defaultValue={moment().locale(locale).add(1, 'day')} 
                                    onChange={this.selectEnd} 
                                    format='DD MMMM YYYY'
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row span={24}>
                        <Col span={8}>
                            <Form.Item
                                label={<Label msg='firstname'/>}
                            >
                                <Input placeholder={text['firstname']} name='fname' onChange={this.handleBlur} />
                            </Form.Item>
                        </Col>
                        <Col span={16}>
                            <Form.Item
                                label={<Label msg='phoneNumberOrPSUPassport'/>}
                            >
                                <Input placeholder={text['phoneNumberOrPSUPassport']} name='userId' style={{width: 300}} onChange={this.handleBlur} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        )
    }

    handleBlur = e => {
        const { value, name } = e.target;

        switch (name) {
            case 'fname':
                this.props.filterName(value);
                break;
            case 'userId':
                this.props.filterUserId(value)
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
    AdminAction
)(SearchForm)