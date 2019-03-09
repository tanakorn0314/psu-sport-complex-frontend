import React from 'react';
import 'isomorphic-unfetch';
import {
    getToken
} from '../helpers/token';
import { connect } from 'react-redux';
import BookingAction from '../redux/booking/actions';

export default ComposedComponent => {
    class withBookingData extends React.Component {
        static async getInitialProps(ctx) {
            const { req, store } = ctx;
            const pageProps = ComposedComponent.getInitialProps ? await ComposedComponent.getInitialProps(ctx) : {};
            const token = getToken(req);
            if (token) {
                // store.dispatch({type: BookingAction.FETCH_BOOKING, payload: {token, courtId: 1}});
                // store.dispatch(BookingAction.fetchBooking(token, 1));
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
