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
import SelectStadium from '../selectStadiumAdmin';
import { Label, H2 } from '../../components/typo';
import { withNamespaces, i18n } from '../../i18n';

class SearchForm extends React.Component {

    render() {
        const { t } = this.props;
        const locale = i18n.language || 'en';
        return (
            <Card style={this.props.style}>
                <H2 msg='searchBooking'/>
                <Form layout='inline'>
                    <Row justify='space-between'>
                        <Col span={8} >
                            <Form.Item
                                label={<Label msg='sport'/>}
                            >
                                <SelectStadium enableAll/>
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
                                <Input placeholder={t('firstname')} name='fname' onChange={this.handleBlur} />
                            </Form.Item>
                        </Col>
                        <Col span={16}>
                            <Form.Item
                                label={<Label msg='psuPassportOrPhoneNumber'/>}
                            >
                                <Input placeholder={t('psuPassportOrPhoneNumber')} name='userId' style={{width: 300}} onChange={this.handleBlur} />
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
        if (!start)
            return;
        this.props.filterStart(start);
    }

    selectEnd = end => {
        if (!end)
            return;
        this.props.filterEnd(end)
    }

}

export default connect(
    state => state,
    AdminAction
)(withNamespaces('common')(SearchForm))