import React from 'react';
import { connect } from 'react-redux';
import OperatioTimeAction from '../../../redux/operationTime/actions';
import { Card, Button, Modal, notification } from 'antd';
import OperationTimeDay from '../../../components/optimeDay';

class ManageOperationTime extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: {
                isOpen: false,
            },
            ...props.OperationTime.operationTimes
        }
    }

    componentDidMount() {
        this.props.getOperationTime();
    }

    render() {
        const { modal } = this.state;
        return (
            <Card style={this.props.style}>
                <h1>Operation Time</h1>
                {this.renderOperationTime()}
                <Button onClick={this.showModal} style={{marginTop: 6}}>Save</Button>
                <Modal
                    title='Confirm Your Action'
                    toggle={this.toggle}
                    onCancel={this.toggle}
                    visible={modal.isOpen}
                    onOk={this.handleConfirm}
                >
                    Are you sure to change operation time ?
                </Modal>
            </Card>
        )
    }

    renderOperationTime = () => {
        const { operationTimes } = this.props.OperationTime;
        return Object.entries(operationTimes).map(([key, value]) => (
            <OperationTimeDay name={key} day={key} value={value} onChange={this.handleChange}/>
        ))
    }

    handleChange = (name, value) => {
        this.setState({[name]: value});
    }

    handleConfirm = async () => {
        const { Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday } = this.state;
        const oprerationTimes = {
           Sunday,
           Monday,
           Tuesday,
           Wednesday,
           Thursday,
           Friday,
           Saturday
        }
        const result = await this.props.setOperationTime(oprerationTimes);
        
        if (result.error) {
            notification['error']({
                message: 'Error',
                description: result.error,
                duration: 3
            })
        } else {
            notification['success']({
                message: 'Succcess',
                description: 'Operation time changed',
                duration: 3
            });
            this.toggle();
        }
    }

    showModal = () => {
        const { modal } = this.state;
        modal.isOpen = true;
        this.setState(modal);
    }

    toggle = () => {
        const { modal } = this.state;
        modal.isOpen = !modal.isOpen;
        this.setState(modal);
    }
}

export default connect(state => state, OperatioTimeAction)(ManageOperationTime);