import { compose } from 'redux';
import withAuth from '../withAuth';
import withLayout from '../withLayout';
import withTheme from '../withTheme';

export default compose(withAuth, withLayout, withTheme);