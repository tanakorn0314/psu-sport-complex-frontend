import { compose } from 'redux';
import withAuth from '../withAuth';
import withLayout from '../withLayout';
import withBookingData from '../withBookingData';
import withTheme from '../withTheme';
import withEnquireScreen from '../withEnquireScreen';

export default compose(withBookingData, withAuth, withTheme, withEnquireScreen, withLayout);