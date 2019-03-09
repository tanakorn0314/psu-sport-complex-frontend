import React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import StyledWrapper from './style';
import BookingService from '../../../coreLayer/service/bookingService';
import { bookingApi } from '../../../coreLayer/api/api';

class BookingConfirm extends React.Component {

    constructor(props) {
        super(props);
        const { id } = this.props.query;
        const booking = props.Booking.myBookings[+id];
        console.log(booking);
        const image = booking.slip ? `${bookingApi}/slip/${booking.slip}` : `/static/Placeholder.jpg`;
            this.state = {
                file: {},
                booking,
                image,
                formData: {},
            }
    }

    render() {
        const { booking } = this.state;
        const { stadium } = this.props.Stadium;
        return (
            <StyledWrapper>
                <h1 className='title'>CONFIRM BOOKING</h1>
                <div>Stadium : {booking.court.name}</div>
                <div>Start Date : {new Date(booking.startDate).toLocaleString()}</div>
                <div>End Date : {new Date(booking.endDate).toLocaleString()}</div>
                <div>Service fees : {stadium[booking.court.stadiumId].costPublic} Baht</div>
                <div>Status : {booking.status} </div>
                <div>Upload picture</div>
                <label htmlFor='upload-image'>
                    <img src={this.state.image} className='img' width='300px' height='200px' /> <br />
                    <input id='upload-image' className='input-upload' type='file' name='file' onChange={this.handleChange} /> <br />
                </label>
                <br />
                <Button color='primary' onClick={this.handleSubmit}>CONFIRM</Button>
                <Button color='danger'>DELETE</Button>
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
        if (!response.error) {
            alert('Upload success')
        }
    }
}

export default connect(state => state)(BookingConfirm);