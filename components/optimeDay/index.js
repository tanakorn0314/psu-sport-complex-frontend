import React from 'react';
import { Row, Col, Checkbox, Divider } from 'antd';
import InputTime from '../inputTime';
import moment from 'moment';

class OperationTimeDay extends React.Component {

    constructor(props) {
        super(props);
        const { value } = props;
        this.state = {
            checked: !!value,
            start: value ? value.start : '00:00',
            end: value ? value.end : '00:00',
        }
    }

    render() {
        const { day } = this.props;
        const { checked } = this.state;
        return (
            <Row type='flex' align='middle' gutter={24}>
                <Col><Checkbox checked={checked} onChange={this.handleCheck} /></Col>
                <Col span={3}>{day}</Col>
                {this.renderTimeAction()}
            </Row>
        )
    }

    renderTimeAction = () => {
        const { start, end, checked } = this.state;
        const format = 'HH:mm'
        const disabled = !checked;
        return [
            <Col>
                <InputTime defaultValue={moment(start, format)} disabled={disabled} onChange={this.handleChangeStart} />
            </Col>,
            <Col>
                -
            </Col>,
            <Col>
                <InputTime defaultValue={moment(end, format)} disabled={disabled} onChange={this.handleChangeEnd} />
            </Col>
        ]
    }

    handleCheck = (e) => {
        const { checked } = e.target;
        this.setState({ checked }, () => {
            this.updateValue();
        });
    }

    handleChangeStart = (v) => {
        const value = v.format('HH:mm');
        this.setState({ start: value }, () => {
            this.updateValue();
        });

    }

    handleChangeEnd = (v) => {
        const value = v.format('HH:mm');
        this.setState({ end: value }, () => {
            this.updateValue();
        });
    }

    updateValue = () => {
        const { start, end, checked } = this.state;
        const { name } = this.props;
        const value = checked ? { start, end } : null;
        this.props.onChange && this.props.onChange(name, value);
    }
}

export default OperationTimeDay;