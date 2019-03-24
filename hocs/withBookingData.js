import React from 'react';
import 'isomorphic-unfetch';
import {
    getToken
} from '../helpers/token';
import { connect } from 'react-redux';
import BookingAction from '../redux/booking/actions';
import StadiumAction from '../redux/stadium/actions';
import BookingInputAction from '../redux/bookingInput/actions';

export default ComposedComponent => {
    class withBookingData extends React.Component {
        static async getInitialProps(ctx) {
            const { req, store, query } = ctx;
            const pageProps = ComposedComponent.getInitialProps ? await ComposedComponent.getInitialProps(ctx) : {};
            const token = getToken(req);
            if (token) {
                await store.dispatch(BookingAction.fetchBooking(token, 1));
                await store.dispatch(BookingInputAction.selectCourt(0));
                await store.dispatch(BookingAction.fetchMyBooking(token));
                await store.dispatch(StadiumAction.fetchStadium());
            }
            if (query){
                pageProps.query = query;
            }
            
            return pageProps;
        }

        render() {
            return (
                <ComposedComponent {...this.props} />
            )
        }
    }
    return connect(state => state, BookingAction)(withBookingData);
}
