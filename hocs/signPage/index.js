import { compose } from 'redux';
import withRedirect from '../withRedirect';
import withTheme from '../withTheme';

export default compose(withRedirect, withTheme);;