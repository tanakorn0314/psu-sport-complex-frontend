import React from 'react';
import 'isomorphic-unfetch';
import {
    getToken
} from '../helpers/token';
import { connect } from 'react-redux';
import AdminAction from '../redux/admin/actions';
import BookingAction from '../redux/booking/actions';
import StadiumAction from '../redux/stadium/actions';
import BillAction from '../redux/bill/actions';
import OperationTimeAction from '../redux/operationTime/actions';
import { url } from '../config';
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
            this.socket = io(url);
            this.socket.on('createBookings', async (bookings) => {
                console.log('created', bookings);
                await this.props.callbackCreate(bookings);
                this.props.callbackAdmin();
            });
            this.socket.on('updateBookings', async (bookings) => {
                console.log('updated', bookings);
                await this.props.callbackUpdate(bookings);
                this.props.callbackAdmin();
            });
            this.socket.on('deleteBookings', async (bookings) => {
                console.log('deleted', bookings);
                await this.props.callbackDelete(bookings);
                this.props.callbackAdmin();
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
    return connect(state => state, {...AdminAction, ...BookingAction})(withData);
}
