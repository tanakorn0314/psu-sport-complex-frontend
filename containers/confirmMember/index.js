import React from 'react';
import { connect } from 'react-redux';
import PubSub from 'pubsub-js';
import moment from 'moment';
import { Row, Col, notification } from 'antd';

import { locale } from '../../common/text';
import UserAction from '../../redux/users/actions';
import DatePicker from '../../components/datePicker';
import Input from '../../components/input';
import { H4 } from '../../components/typo';

class ConfirmMember extends React.Component {

    constructor(props) {
        super(props);

        this.selectedId = props.selectedId;

        this.state = {
            startDate: moment(),
            endDate: moment().add('month', 1),
            amount: 500
        }
    }

    componentWillReceiveProps(nextProps) {
        this.selectedId = nextProps.selectedId;

        this.setState({
            startDate: moment(),
            endDate: moment().add('month', 1),
            amount: 500
        })
    }

    componentDidMount() {
        this.token1 = PubSub.subscribe('confirmMember', () => {
            this.confirmMember();
        })
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.token1);
    }

    render() {
        console.log(this.selectedId);
        const { startDate, endDate, amount } = this.state;
        return (
            <div>
                <Row gutter={12} style={{ marginBottom: 5 }}>
                    <Col span={12}>
                        <H4 msg='startDate' />
                        <DatePicker
                            style={{ width: '100%' }}
                            value={startDate.locale(locale)}
                            onChange={this.handleSelectStart}
                            format='DD MMMM YYYY'
                        />
                    </Col>
                    <Col span={12}>
                        <H4 msg='endDate' />
                        <DatePicker
                            style={{ width: '100%' }}
                            value={endDate.locale(locale)}
                            onChange={this.handleSelectEnd}
                            format='DD MMMM YYYY'
                        />
                    </Col>
                </Row>
                <H4 msg='amount' />
                <Input
                    style={{ width: '100%' }}
                    name='amount'
                    value={amount}
                    defaultValue={this.state.amount}
                    onChange={this.handleChange} />
            </div>
        )
    }

    handleSelectStart = startDate => {
        this.setState({ startDate })
    }

    handleSelectEnd = endDate => {
        this.setState({ endDate })
    }

    handleChange = e => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    }

    hideModal = () => {
        PubSub.publish('hideModal');
    }

    confirmMember = async () => {
        const {
            startDate,
            endDate,
            amount
        } = this.state;

        const data = {
            startDate,
            endDate,
            amount
        }

        const result = await this.props.toMember(this.selectedId, data);

        if (result.error) {
            notification['error']({
                message: message['error'],
                description: errors(result.error),
                duration: 3
            })
        } else {
            notification['success']({
                message: message['success'],
                description: message['upgradeUserSuccess'],
                duration: 3
            });
            this.hideModal();
        }
    }
}

export default connect(state => state, UserAction)(ConfirmMember);