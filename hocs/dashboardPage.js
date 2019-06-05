import { compose } from 'redux';
import withAuth from './withAuth';
import withDashboard from './withDashboard';
import withData from './withData';
import withEnquireScreen from './withEnquireScreen';
import withModal from './withModal';

export default compose(withDashboard, withData, withAuth, withModal, withEnquireScreen,);