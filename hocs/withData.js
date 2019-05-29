import React from 'react';
import 'isomorphic-unfetch';
import {
    getToken
} from '../helpers/token';
import { connect } from 'react-redux';
import BookingAction from '../redux/booking/actions';
import StadiumAction from '../redux/stadium/actions';
import BillAction from '../redux/bill/actions';
import OperationTimeAction from '../redux/operationTime/actions';
import { socketUrl } from '../config';
import io from 'socket.io-client'

export default ComposedComponent => {
    class withData extends React.Component {
        static async getInitialProps(ctx) {
            const { req, store, query } = ctx;
            const pageProps = ComposedComponent.getInitialProps ? await ComposedComponent.getInitialProps(ctx) : {};
            const token = getToken(req);

            const selectedStadium = store.getState().Booking.stadiumId;

            await store.dispatch(StadiumAction.fetchStadium());
            await store.dispatch(OperationTimeAction.getOperationTime());
            await store.dispatch(OperationTimeAction.getBlackout());

            await store.dispatch(BookingAction.selectStadium(selectedStadium));

            if (token && token !== 'undefined') {
                await store.dispatch(BillAction.fetchMyBills(token));
            }
            if (query) {
                pageProps.query = query;
            }

            return pageProps;
        }

        componentDidMount() {
            this.socket = io(socketUrl);
            this.socket.on('createBookings', (bookings) => {
                console.log('created', bookings);
                this.props.callbackCreate(bookings);
            });
            this.socket.on('updateBookings', (bookings) => {
                console.log('updated', bookings);
                this.props.callbackUpdate(bookings);
            });
            this.socket.on('deleteBookings', (bookings) => {
                console.log('deleted', bookings);
                this.props.callbackDelete(bookings);
            });

        }

        componentWillUnmount() {
            this.socket.off('createBookings');
            this.socket.off('updateBookings');
            this.socket.off('deleteBookings');
            this.socket.close();
        }

        render() {
            return (
                <ComposedComponent {...this.props} />
            )
        }
    }
    return connect(state => state, BookingAction)(withData);
}
