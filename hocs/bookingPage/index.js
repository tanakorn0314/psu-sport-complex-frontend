import { compose } from 'redux';
import withAuth from '../withAuth';
import withLayout from '../withLayout';
import withBookingData from '../withBookingData';

export default compose(withBookingData, withAuth, withLayout);