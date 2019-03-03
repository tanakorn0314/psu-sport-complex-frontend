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
import { storeUser } from '../../action/auth-action';

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

class BootstrapNav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            accessToken: props.accessToken
        };
    }

    render() {
        const { accessToken } = this.state;
        return (
            <div>
                <Navbar expand="md">
                    <Link href='/'>
                        <a className='navbar-brand'>{appName}</a>
                    </Link>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto mynav" navbar>
                            <NavItem>
                                <Link href='/'>
                                    <a className='nav-link'>Stadium</a>
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link href='/book_online'>
                                    <a className='nav-link'>Book Online</a>
                                </Link>
                            </NavItem>
                            <NavItem>
                                    <Link href='/'>
                                        <a className='nav-link'>Contact Us</a>
                                    </Link>
                            </NavItem>
                            <form className='form-inline'>
                                {accessToken && accessToken!=='' ? <SignOut onClick={this.clearUser} /> : <SignIn/>}
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
        this.setState({
            accessToken: ''
        });
        this.props.clearUser();
    }
}

const mapStateToProps = state => ({
    user: state.user
  })

const mapDispatchToProps = dispatch => ({
    clearUser: () => {
        dispatch(storeUser(''));
        document.cookie = `accessToken=`
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BootstrapNav);