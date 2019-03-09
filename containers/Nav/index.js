import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button
} from 'reactstrap';
import Link from 'next/link';
import { connect } from 'react-redux';
import AuthAction from '../../redux/auth/actions';

const appName = 'PSU Sport Complex';

const SignIn = () => (
    <NavLink>
        <Link href='/signin'>
            <Button color='primary' outline className='menu-item'>SIGN IN</Button>
        </Link>
    </NavLink>
);

const SignOut = props => (
    <Button color='primary' className='menu-item' onClick={props.onClick}>SIGN OUT</Button>
)

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    render() {
        return (
            <div>
                <Navbar expand="md">
                    <Link href='/'>
                        <a className='navbar-brand'>{appName}</a>
                    </Link>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto mynav" navbar>
                            {/* <NavItem>
                                <Link href='/'>
                                    <a className='nav-link'>Stadium</a>
                                </Link>
                            </NavItem> */}
                            <NavItem>
                                <Link href='/booking'>
                                    <a className='nav-link'>Booking</a>
                                </Link>
                            </NavItem>
                            {/* <NavItem>
                                    <Link href='/'>
                                        <a className='nav-link'>Contact Us</a>
                                    </Link>
                            </NavItem> */}
                            <form className='form-inline'>
                                {!!this.props.Auth.idToken ? <SignOut onClick={this.clearUser} /> : <SignIn/>}
                            </form>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    clearUser = () => {
        this.props.logout();
        this.setState({
            token: null
        });
    }
}

export default connect(
    state => state,
    AuthAction
)(NavBar);