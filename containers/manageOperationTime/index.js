import React from 'react';
import { connect } from 'react-redux';
import { Card, Button, notification } from 'antd';
import ModalAction from '../../redux/modal/actions';
import OperatioTimeAction from '../../redux/operationTime/actions';
import OperationTimeDay from '../../components/optimeDay';
import { H2, TextButton } from '../../components/typo';
import text, { errors } from '../../common/text';

class ManageOperationTime extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props.OperationTime.operationTimes
        }
    }

    componentDidMount() {
        this.props.getOperationTime();
    }

    render() {
        return (
            <Card style={this.props.style}>
                <H2 msg='operationTime'/>
                {this.renderOperationTime()}
                <Button onClick={this.showModal} style={{marginTop: 6}} type='primary'>
                    <TextButton msg='save'/>
                </Button>
            </Card>
        )
    }

    renderOperationTime = () => {
        const { operationTimes } = this.props.OperationTime;
        return Object.entries(operationTimes).map(([key, value]) => (
            <OperationTimeDay key={key} name={key} day={key} value={value} style={{marginBottom: 5}} onChange={this.handleChange}/>
        ))
    }

    showModal = () => {
        this.props.showConfirmModal('editOperationTime', 'areYouSureToEditOperationTime', () => {
            this.handleConfirm();
            this.props.hideModal();
        });
    }

    handleChange = (name, value) => {
        this.setState({[name]: value});
    }

    handleConfirm = async () => {
        const { sunday, monday, tuesday, wednesday, thursday, friday, saturday } = this.state;
        const oprerationTimes = {
           sunday,
           monday,
           tuesday,
           wednesday,
           thursday,
           friday,
           saturday
        }
        const result = await this.props.setOperationTime(oprerationTimes);
        
        if (result.error) {
            notification['error']({
                message: text['error'],
                description: errors(result.error),
                duration: 3
            })
        } else {
            notification['success']({
                message: text['success'],
                description: text['operationTimeChanged'],
                duration: 3
            });
        }
    }
}

export default connect(
    state => state,
    { ...OperatioTimeAction, ...ModalAction}
)(ManageOperationTime);