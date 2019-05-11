import { compose } from 'redux';
import withAuth from '../withAuth';
import withLayout from '../withLayout';
import withBookingData from '../withBookingData';
import withTheme from '../withTheme';
import withEnquireScreen from '../withEnquireScreen';
import withCheckAuth from '../withCheckAuth';

export default compose(withAuth, withCheckAuth, withBookingData, withTheme, withEnquireScreen, withLayout);