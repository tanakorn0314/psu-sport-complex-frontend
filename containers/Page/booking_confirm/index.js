import React from 'react';
import {
    Button,
    notification,
    Modal
} from 'antd';
import { connect } from 'react-redux';
import BookingActions from '../../../redux/booking/actions';
import StyledWrapper from './style';
import BookingService from '../../../coreLayer/service/bookingService';
import { bookingApi } from '../../../coreLayer/api/api';
import StatusTag from '../../../components/statusTag';
import Router from 'next/router';

class BookingConfirm extends React.Component {

    constructor(props) {
        super(props);
        const { id } = this.props.query;
        const booking = props.Booking.myBookings.find((booking) => booking.bookingId === +id);
        const image = booking.slip ? `${bookingApi}/slip/${booking.slip}` : `/static/Placeholder.jpg`;
        this.state = {
            file: {},
            booking,
            image,
            formData: {},
            status: booking.status,
            modal: {
                title: '',
                body: '',
                isOpen: '',
                action: '',
                cancel: '',
                isOpen: false
            },
        }
    }

    render() {
        const { booking, status, modal } = this.state;
        const { stadium } = this.props.Stadium;
        return (
            <StyledWrapper>
                <h1 className='title'>CONFIRM BOOKING</h1>
                <div className='content'>
                    <div>Stadium : {booking.court.name}</div>
                    <div>Start Date : {new Date(booking.startDate).toLocaleString()}</div>
                    <div>End Date : {new Date(booking.endDate).toLocaleString()}</div>
                    <div>Service fees : {stadium[booking.court.stadiumId-1].costPublic} Baht</div>
                    <div>Status : <StatusTag status={status}>{status}</StatusTag> </div>
                    <label htmlFor='upload-image'>
                        <img src={this.state.image} className='img' /> <br />
                        <input id='upload-image' className='input-upload' type='file' name='file' onChange={this.handleChange} />
                    </label>
                    <Button onClick={this.handleSubmit} type='primary' style={{ marginRight: 5 }}>CONFIRM</Button>
                    <Button onClick={this.handleDelete} type='danger' disabled={status === 'paid'}>DELETE</Button>
                    <div style={{marginTop: 10}}>
                        <a href='/' onClick={this.navigateBack}>Back</a>
                    </div>
                </div>
                <Modal
                    visible={modal.isOpen}
                    toggle={this.toggle}
                    title={modal.title}
                    footer={[
                        (modal.action.length > 0 && <Button type="primary" onClick={this.deleteBooking}>{modal.action}</Button>),
                        <Button type="secondary" onClick={this.toggle}>{modal.cancel}</Button>
                    ]}
                >
                    {this.state.modal.body}
                </Modal>
            </StyledWrapper>
        )
    }

    handleChange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            this.setState({
                image: reader.result,
                file
            });
        }

        reader.readAsDataURL(file);
    }

    handleSubmit = async () => {
        const { idToken } = this.props.Auth;
        const { booking } = this.state;
        const formData = new FormData();
        formData.append('file', this.state.file);
        const response = await BookingService.uploadSlip(idToken, formData, booking.bookingId);
        if (response.error) {
            notification['error']({
                message: 'Error',
                description: response.error,
                duration: 3
            });
        } else {
            notification['success']({
                message: 'Success',
                description: 'Confirm booking success',
                duration: 3
            });
            this.setState({ status: 'paid' })
        }
    }

    handleDelete = () => {
        this.showModal('Warning !', 'Are you sure to delete this booking ?', 'Cancel', 'Confirm')
    }

    showModal = (title, body, cancel = 'cancel', action = '') => {
        const { modal } = this.state;
        modal.title = title;
        modal.body = body;
        modal.cancel = cancel;
        modal.action = action;
        modal.isOpen = true;
        this.setState({ modal });
    }

    toggle = () => {
        const { modal } = this.state;
        modal.isOpen = !modal.isOpen;
        this.setState({
            modal
        });
    }

    deleteBooking = async () => {
        const { idToken } = this.props.Auth;
        const courtId = this.props.query.id;
        const result = await this.props.remove(idToken, courtId);
        if (result && !result.error) {
            this.toggle();
            notification['success']({
                message: 'Success',
                description: 'Booking delete successful',
                duration: 2
            });
            setTimeout(() => {
                Router.back()
            }, 500);
        }
    }

    navigateBack = e => {
        e.preventDefault();
        Router.back();
    }
}

export default connect(
    state => state,
    BookingActions
    )(BookingConfirm);