import { compose } from 'redux';
import withAuth from '../withAuth';
import withDashboard from '../withDashboard';
import withData from '../withData';
import withTheme from '../withTheme';
import withEnquireScreen from '../withEnquireScreen';
import withModal from '../withModal';

export default compose(withAuth, withData, withDashboard, withModal, withTheme, withEnquireScreen);