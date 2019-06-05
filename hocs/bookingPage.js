import { compose } from 'redux';
import withEnquireScreen from './withEnquireScreen';
import withNavLayout from './withNavLayout';
import withAuth from './withAuth';
import withModal from './withModal';
import withData from './withData';

export default compose(withData, withAuth, withNavLayout, withEnquireScreen, withModal);