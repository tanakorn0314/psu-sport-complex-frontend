import { compose } from 'redux';
import withAuth from '../withAuth';
import withDashboard from '../withDashboard';
import withBookingData from '../withBookingData';
import withTheme from '../withTheme';

export default compose(withBookingData, withAuth, withTheme, withDashboard);