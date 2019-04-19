import { compose } from 'redux';
import withAuth from '../withAuth';
import withLayout from '../withLayout';
import withTheme from '../withTheme';
import withEnquireScreen from '../withEnquireScreen';

export default compose(withAuth, withLayout,withEnquireScreen, withTheme);