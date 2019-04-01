import Navbar from '../components/navbar';
import Head from '../components/head';

const Layout = props => (
    <div>
        <Head/>
        <Navbar/>
        {props.children}
    </div>
);

export default Layout;