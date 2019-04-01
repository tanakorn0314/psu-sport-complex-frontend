import Navbar from '../components/bootstrap_nav';
import Head from '../components/head';

const NavLayout = props => (
    <div>
        <Head/>
        <Navbar accessToken={props.accessToken}/>
        {props.children}
    </div>
);

export default NavLayout;