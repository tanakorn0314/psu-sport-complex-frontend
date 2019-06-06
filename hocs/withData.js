import React from 'react';
import 'isomorphic-unfetch';
import PubSub from 'pubsub-js';
import { connect } from 'react-redux';
import AdminAction from '../redux/admin/actions';
import BookingAction from '../redux/booking/actions';
import LangAction from '../redux/lang/actions';
import StadiumAction from '../redux/stadium/actions';
import BillAction from '../redux/bill/actions';
import OperationTimeAction from '../redux/operationTime/actions';
import { url } from '../config';
import io from 'socket.io-client'
import { getLang } from '../helpers/lang';

export default ComposedComponent => {
    class withData extends React.Component {
        static async getInitialProps(ctx) {
            const { req, store, query } = ctx;
            const pageProps = ComposedComponent.getInitialProps ? await ComposedComponent.getInitialProps(ctx) : {};
            
            const token = pageProps.token;

            const selectedStadium = store.getState().Booking.stadiumId;

            await store.dispatch(LangAction.setLang(getLang(req)));
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

            this.socket.on('bookingApproved', async (bill) => {
                if (bill.userId === this.props.Auth.profile.userId) 
                    PubSub.publish('bookingApproved');
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
            this.socket.close();
        }

        render() {
            return (
                <ComposedComponent {...this.props} />
            )
        }
    }
    return connect(state => state, {...AdminAction, ...BookingAction, ...LangAction})(withData);
}
