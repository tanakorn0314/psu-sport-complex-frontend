import Navbar from './navbar';
import Head from './head';

const Layout = props => (
    <div>
        <Head/>
        <Navbar/>
        {props.children}
    </div>
);

export default Layout;