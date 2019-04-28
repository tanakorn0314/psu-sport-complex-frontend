import { compose } from 'redux';
import withRedirect from '../withRedirect';
import withCheckToken from '../withCheckToken';
import withTheme from '../withTheme';
import withEnquireScreen from '../withEnquireScreen';

export default compose(withCheckToken, withTheme, withEnquireScreen);