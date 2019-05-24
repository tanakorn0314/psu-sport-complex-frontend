import React from 'react';
import { Row, Col, Checkbox, Divider } from 'antd';
import InputTime from '../inputTime';
import moment from 'moment';

class OperationTimeDay extends React.Component {

    constructor(props) {
        super(props);
        const { value } = props;
        const sStart = value ? value.start : '00:00';
        const sEnd = value ? value.end : '00:00';

        const start = moment(sStart, 'HH:mm');
        const end = moment(sEnd, 'HH:mm');

        this.state = {
            checked: !!value,
            start,
            end
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
                <InputTime value={start} disabled={disabled} onChange={this.handleChangeStart} />
            </Col>,
            <Col>
                -
            </Col>,
            <Col>
                <InputTime value={end} disabled={disabled} onChange={this.handleChangeEnd} />
            </Col>
        ]
    }

    handleCheck = (e) => {
        const { checked } = e.target;
        this.setState({ checked }, () => {
            this.updateValue();
        });
    }

    handleChangeStart = (start) => {
        this.setState({start} , () => {this.updateValue()});
    }

    handleChangeEnd = (end) => {
        this.setState({end}, () => {this.updateValue()});
    }

    updateValue = () => {
        const { start, end, checked } = this.state;
        const { name } = this.props;


        const value = checked ? { start: start.format('HH:mm'), end: end.format('HH:mm') } : null;
        this.props.onChange && this.props.onChange(name, value);
    }
}

export default OperationTimeDay;