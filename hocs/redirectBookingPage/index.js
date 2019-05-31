import { compose } from 'redux';
import withAuth from '../withAuth';
import withLayout from '../withLayout';
import withData from '../withData';
import withTheme from '../withTheme';
import withEnquireScreen from '../withEnquireScreen';
import withCheckAuth from '../withCheckAuth';
import withModal from '../withModal';

export default compose(withAuth, withCheckAuth, withData, withModal, withTheme, withEnquireScreen, withLayout);