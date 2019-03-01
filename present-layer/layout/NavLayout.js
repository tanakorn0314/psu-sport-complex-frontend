import Navbar from '../components/navbar';
import Head from '../components/head';

const NavLayout = props => (
    <div>
        <Head/>
        <Navbar/>
        {props.children}
    </div>
);

export default NavLayout;