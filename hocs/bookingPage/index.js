import { compose } from 'redux';
import withAuth from '../withAuth';
import withLayout from '../withLayout';
import withBookingData from '../withBookingData';
import withTheme from '../withTheme';

export default compose(withBookingData, withAuth, withTheme, withLayout);