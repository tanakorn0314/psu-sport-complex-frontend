import { compose } from 'redux';
import withAuth from '../withAuth';
import withDashboard from '../withDashboard';
import withBookingData from '../withBookingData';
import withTheme from '../withTheme';
import withEnquireScreen from '../withEnquireScreen';

export default compose(withDashboard, withBookingData, withAuth, withTheme, withEnquireScreen);