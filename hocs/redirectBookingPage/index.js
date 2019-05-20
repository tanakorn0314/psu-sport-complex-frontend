import { compose } from 'redux';
import withAuth from '../withAuth';
import withLayout from '../withLayout';
import withData from '../withData';
import withTheme from '../withTheme';
import withEnquireScreen from '../withEnquireScreen';
import withCheckAuth from '../withCheckAuth';

export default compose(withAuth, withCheckAuth, withData, withTheme, withEnquireScreen, withLayout);