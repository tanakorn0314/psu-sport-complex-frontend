import React from 'react';
import { getToken } from '../../../helpers/token';
import BookingService from '../../../coreLayer/service/bookingService';

export default ComposedComponent => {
    return class withData extends React.Component {
        static async getInitialProps(ctx) {
            const { userId } = ctx.query;
            const token = getToken(ctx.req);
            const bookings = await BookingService.getByUserId(token, userId);
            return {
                bookingList: bookings,
            }
        }

        render() {
            return (
                <ComposedComponent {...this.props}/>
            )
        }
    }
}