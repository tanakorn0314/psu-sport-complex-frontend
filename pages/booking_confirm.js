import React from 'react';
import NavLayout from '../present-layer/layout/layout_nav';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import cookies from 'next-cookies';
import { storeUser } from '../action/auth-action';
import bookingService from '../core-layer/service/booking-service';
import axios from 'axios';
import { withAuth } from '../container/withAuth';

class BookingConfirm extends React.Component {

    static async getInitialProps(ctx) {
        const { id } = ctx.query;
        const { accessToken } = cookies(ctx);
        const booking = await bookingService.getById(accessToken, id);
        return {
            booking,
            id
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            file: {},
            image: '/static/banner.jpg',
            formData: {},
        }
    }

    render() {
        const { booking, accessToken } = this.props;
        return (
            <NavLayout accessToken={accessToken}>
                <div className='container'>
                    <h1 className='title'>CONFIRM BOOKING</h1>
                    <div>Table Tennis1</div>
                    <div>{ ''}</div>
                    <div>{ ''}</div>
                    <div>{ ''}</div>
                    <div>Service fees : 20 Baht</div>
                    <div>Status : unpaid </div>
                    <div>Upload picture</div>
                    <input type='file' name='file' onChange={this.handleChange} /> <br />
                    <img src={this.state.image} width='300px' height='200px' /> <br />
                    <Button color='primary' onClick={this.handleSubmit}>CONFIRM</Button>
                    <Button color='danger'>DELETE</Button>
                </div>
                <style jsx>{`
                    .title {
                        text-align: center;
                    }
                `}</style>
            </NavLayout>
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
        const formData = new FormData();
        formData.append('file', this.state.file);
        const config = {
            headers: {
				'content-type': 'multipart/form-data'
			}
        }
        const response = await bookingService.uploadSlip('',formData);
        console.log(response);
    }
}

export default withAuth(BookingConfirm)