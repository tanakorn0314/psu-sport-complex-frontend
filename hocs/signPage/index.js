import { compose } from 'redux';
import withRedirect from '../withRedirect';
import withTheme from '../withTheme';
import withEnquireScreen from '../withEnquireScreen';

export default compose(withRedirect, withTheme, withEnquireScreen);