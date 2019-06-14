import { compose } from 'redux';
import withEnquireScreen from './withEnquireScreen';
import withNavLayout from './withNavLayout';
import withAuth from './withAuth';
import withTransalate from './withTransalate';
import withNews from './withNews';

export default compose(withNavLayout, withEnquireScreen, withTransalate, withAuth, withNews);