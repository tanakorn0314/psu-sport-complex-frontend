import React from 'react';
import { Row, Col, Checkbox } from 'antd';
import InputTime from '../inputTime';
import { withNamespaces } from '../../i18n';
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
        const { day, t } = this.props;
        const { checked } = this.state;
        return (
            <Row style={this.props.style} type='flex' align='middle' gutter={24}>
                <Col><Checkbox checked={checked} onChange={this.handleCheck} /></Col>
                <Col span={3}>{t(day)}</Col>
                {this.renderTimeAction()}
            </Row>
        )
    }

    renderTimeAction = () => {
        const { start, end, checked } = this.state;
        const disabled = !checked;
        return [
            <Col key={0}>
                <InputTime value={start} disabled={disabled} onChange={this.handleChangeStart} />
            </Col>,
            <Col key={1}>
                -
            </Col>,
            <Col key={2}>
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

export default withNamespaces('common')(OperationTimeDay);