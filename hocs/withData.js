import React from 'react';
import 'isomorphic-unfetch';
import PubSub from 'pubsub-js';
import { connect } from 'react-redux';
import AdminAction from '../redux/admin/actions';
import BookingAction from '../redux/booking/actions';
import StadiumAction from '../redux/stadium/actions';
import BillAction from '../redux/bill/actions';
import OperationTimeAction from '../redux/operationTime/actions';
import { url } from '../config';
import io from 'socket.io-client'
import moment from 'moment';

export default ComposedComponent => {
    class withData extends React.Component {
        static async getInitialProps(ctx) {
            const { store, query } = ctx;
            const pageProps = ComposedComponent.getInitialProps ? await ComposedComponent.getInitialProps(ctx) : {};

            const token = pageProps.token;
            const sportQuery = query.sport;
            const dateQuery = query.date;

            await store.dispatch(StadiumAction.fetchStadium());
            await store.dispatch(OperationTimeAction.getOperationTime());
            await store.dispatch(OperationTimeAction.getBlackout());

            if (sportQuery) {
                const { stadiums } = store.getState().Stadium;
                const idx = stadiums.findIndex((stadium) => stadium.name === sportQuery);
                if (idx >= 0)
                    await store.dispatch(BookingAction.selectStadium(idx + 1));
            } else {
                const { stadiumId } = store.getState().Booking;
                await store.dispatch(BookingAction.selectStadium(stadiumId));
            }

            if (dateQuery) {
                let date = moment(dateQuery, 'DD-MM-YYYY');
                if (!date.isValid())
                    date = moment();
                await store.dispatch(BookingAction.selectDate(date))
            }

            if (token && token !== 'undefined') {
                await store.dispatch(BillAction.fetchBills());
            }
            if (query) {
                pageProps.query = query;
            }

            return pageProps;
        }

        componentDidMount() {
            this.socket = io(url);
            this.socket.on('createBookings', async (bookings) => {
                await this.props.callbackCreate(bookings);
                this.props.callbackAdmin();
            });
            this.socket.on('updateBookings', async (bookings) => {
                await this.props.callbackUpdate(bookings);
                this.props.callbackAdmin();
            });
            this.socket.on('deleteBookings', async (bookings) => {
                await this.props.callbackDelete(bookings);
                this.props.callbackAdmin();
            });
            this.socket.on('bookingConfirmed', async (bill) => {
                if (bill.userId === this.props.Auth.profile.userId)
                    PubSub.publish('bookingConfirmed');
            });
            this.socket.on('bookingRejected', async (bill) => {
                if (bill.userId === this.props.Auth.profile.userId)
                    PubSub.publish('bookingRejected');
            });

        }

        componentWillUnmount() {
            this.socket.off('createBookings');
            this.socket.off('updateBookings');
            this.socket.off('deleteBookings');
            this.socket.off('bookingConfirmed');
            this.socket.off('bookingRejected');
            this.socket.close();
        }

        render() {
            return (
                <ComposedComponent {...this.props} />
            )
        }
    }
    return connect(state => state, { ...AdminAction, ...BookingAction })(withData);
}
