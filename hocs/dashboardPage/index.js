import { compose } from 'redux';
import withAuth from '../withAuth';
import withDashboard from '../withDashboard';
import withData from '../withData';
import withTheme from '../withTheme';
import withEnquireScreen from '../withEnquireScreen';

export default compose(withDashboard, withData, withAuth, withTheme, withEnquireScreen);