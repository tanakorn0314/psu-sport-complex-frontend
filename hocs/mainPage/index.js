import { compose } from 'redux';
import withAuth from '../withAuth';
import withLayout from '../withLayout';

export default compose(withAuth, withLayout);