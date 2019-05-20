import { compose } from 'redux';
import withAuth from '../withAuth';
import withLayout from '../withLayout';
import withData from '../withData';
import withTheme from '../withTheme';
import withEnquireScreen from '../withEnquireScreen';

export default compose(withData, withAuth, withTheme, withEnquireScreen, withLayout);