import { compose } from 'redux';
import withEnquireScreen from './withEnquireScreen';
import withNavLayout from './withNavLayout';
import withAuth from './withAuth';
import withModal from './withModal';
import withTransalate from './withTransalate';

export default compose(withNavLayout, withModal, withEnquireScreen, withTransalate, withAuth);