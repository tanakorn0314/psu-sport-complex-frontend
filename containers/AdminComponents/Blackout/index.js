import React from 'react';
import { connect } from 'react-redux';
import OperatioTimeAction from '../../../redux/operationTime/actions';
import { Row, Col, Card, Button, Input, Table, Divider, Modal } from 'antd';
import InputDateTime from '../../../components/inputDateTime';
import moment from 'moment';

class Blackout extends React.Component {

    constructor(props) {
        super(props);
        const tomorrow = moment().add(1, 'day').hour(0).minute(0);
        const nextDay = moment().add(1, 'day').hour(23).minute(59);

        console.log(tomorrow.month())
        console.log(tomorrow.format());

        this.state = {
            start: {
                minute: tomorrow.minute(),
                hour: tomorrow.hour(),
                date: tomorrow.date(),
                month: tomorrow.month(),
                year: tomorrow.year()
            },
            end: {
                minute: nextDay.minute(),
                hour: nextDay.hour(),
                date: nextDay.date(),
                month: nextDay.month(),
                year: nextDay.year()
            },
            title: '',
            detail: '',
            modal: {
                isOpen: false,
                title: '',
                start: '',
                end: '',
                detail: ''
            }
        }
    }

    componentDidMount() {
        this.props.getBlackout();
    }

    render() {
        const { blackoutSeries } = this.props.OperationTime;
        const { start, end, modal } = this.state;
        const column = [
            {
                title: '#',
                dataIndex: 'no',
                key: 'no',
            },
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: 'Start',
                dataIndex: 'start',
                key: 'start',
            },
            {
                title: 'End',
                dataIndex: 'end',
                key: 'end',
            },
            {
                title: 'Action',
                key: 'action',
                dataIndex: 'id',
                render: (id) => (
                    <div>
                        <a href='#' id={id} onClick={this.handleDelete}>Delete</a>
                        <Divider type='vertical' />
                        <a href='#' id={id} onClick={this.showDetail}>Detail</a>
                    </div>
                )
            }
        ];
        const dataSource = blackoutSeries.map((blackout, index) => ({
            no: index + 1,
            title: blackout.title,
            start: moment(blackout.start).format('DD/MM/YYYY HH:mm'),
            end: moment(blackout.end).format('DD/MM/YYYY HH:mm'),
            id: blackout.blackoutId
        }))
        return (
            <Card style={this.props.style}>
                <Row gutter={8}>
                    <h1>Blackout</h1>
                    <Col span={12}>
                        <label htmlFor='startDate'>Start Date</label>
                        <InputDateTime
                            id='startDate'
                            style={{ display: 'flex' }}
                            minute={start.minute}
                            hour={start.hour}
                            date={start.date}
                            month={start.month}
                            year={start.year}
                            onChange={this.handleStartChange}
                        />
                        <label htmlFor='endDate'>End Date</label>
                        <InputDateTime
                            id='endDate'
                            style={{ display: 'flex' }}
                            minute={end.minute}
                            hour={end.hour}
                            date={end.date}
                            month={end.month}
                            year={end.year}
                            onChange={this.handleEndChange}
                        />
                        <label htmlFor='inputTitle'>Title</label><br />
                        <Input id='inputTitle' name='title' placeholder='title' onChange={this.handleChange} style={{ maxWidth: 160, marginBottom: 10 }} /> <br />
                        <label htmlFor='inputDetail'>Detail</label> <br />
                        <Input id='inputDetail' name='detail' placeholder='detail' onChange={this.handleChange} style={{ maxWidth: 160, marginBottom: 10 }} /><br />
                        <Button onClick={this.handleAdd}>Add</Button>
                    </Col>
                    <Col span={12}>
                        <h1>Blackout List</h1>
                        <Table
                            columns={column}
                            dataSource={dataSource}
                            pagination={{ pageSize: 5 }}
                        />
                    </Col>
                </Row>
                <Modal
                    title='Blackout Detail'
                    visible={modal.isOpen}
                    onCancel={this.hideModal}
                    toggle={this.toggleModal}
                    footer={[<Button onClick={this.toggleModal}>OK</Button>]}
                >
                    <h3>{modal.title}</h3>
                    <div>Start {modal.start}</div>
                    <div>End {modal.end}</div>
                    <p>{modal.detail}</p>
                </Modal>
            </Card>
        )
    }

    handleStartChange = (key, value) => {
        let { start } = this.state;
        start = { ...start, [key]: value }
        this.setState({ start })
    }

    handleEndChange = (key, value) => {
        let { end } = this.state;
        end = { ...end, [key]: value }
        this.setState({ end })
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    handleAdd = async () => {
        let { start, end, title, detail } = this.state;
        const dto = {
            start: moment().year(start.year).month(start.month).date(start.date).hour(start.hour).minute(start.minute).format(),
            end: moment().year(end.year).month(end.month).date(end.date).hour(end.hour).minute(end.minute).format(),
            title,
            detail
        };
        await this.props.createBlackout(dto);
    }

    handleDelete = async (e) => {
        const { id } = e.target;
        await this.props.deleteBlackout(+id);
    }

    showDetail = (e) => {
        const { id } = e.target;
        const { blackoutSeries } = this.props.OperationTime;
        const { modal } = this.state;

        const blackout = blackoutSeries.find((b) => b.blackoutId === +id);

        modal.title = blackout.title;
        modal.start = moment(blackout.start).format('DD/MM/YYYY HH:mm');
        modal.end = moment(blackout.end).format('DD/MM/YYYY HH:mm');
        modal.detail = blackout.detail;
        modal.isOpen = true;

        this.setState({modal});
    }

    hideModal = () => {
        const { modal } = this.state;
        modal.isOpen = false;
        this.setState({modal})
    }

    toggleModal = () => {
        const { modal } = this.state;
        modal.isOpen = !modal.isOpen;
        this.setState({modal})
    }
}

export default connect(state => state, OperatioTimeAction)(Blackout);