import React from 'react';
import Link from '../../containers/link';
import Router, { withRouter } from 'next/router';
import { connect } from 'react-redux';
import AuthAction from '../../redux/auth/actions';
import ModalAction from '../../redux/modal/actions';
import logo from '../../static/image/psu_brand.png';
import { Menu, MenuItem } from '../../components/menu';
import { TextMenuItem, TextButton } from '../../components/typo';
import { StyledPopover as Popover } from './style';
import {
    Row,
    Col,
    Icon
} from 'antd';
import Button from '../../components/button';

class TopNavContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            showMenu: false,
            current: props.router.pathname.split('/')[1]
        }
    }

    componentDidMount() {
        this.setState({ isLoading: false });
    }

    render() {
        const { isLoading } = this.state;

        return (
            <div>
                <Row type='flex' justify='space-between' align='middle'>
                    <Col className='logo-container' style={{ flex: 1 }} key={1}>
                        <Link href='/'>
                            <img src={logo} width='120px' style={{ cursor: 'pointer' }} />
                        </Link>
                    </Col>
                    <Col className='menu-container'>
                        {!isLoading && this.renderMenu()}
                    </Col>
                </Row>
            </div>
        )
    }

    renderMenu = () => {
        const { isMobile } = this.props.Screen;
        const { showMenu } = this.state;

        if (isMobile)
            return (
                <Popover
                    visible={showMenu}
                    content={this.renderMenuItems()}
                    placement='bottomRight'
                    arrowPointAtCenter
                    trigger='click'
                    onVisibleChange={this.handleVisibleChange}
                >
                    <Icon type='menu' onClick={this.toggleShowMenu} />
                </Popover>
            )
        else
            return this.renderMenuItems();
    }

    renderMenuItems = () => {
        const { isMobile } = this.props.Screen;
        const { profile } = this.props.Auth;

        const menuMode = isMobile ? 'inline' : 'horizontal';

        return (
            <Menu selectedKey={this.state.current} mode={menuMode}>
                {profile && profile.position === 'admin' &&
                    <MenuItem name='dashboard'><Link href='/dashboard/booking'><TextMenuItem msg='admin' /></Link></MenuItem>},
                    <MenuItem name='booking'><Link href='/booking'><TextMenuItem msg='booking' /></Link></MenuItem>,
                    {this.renderAccountMenu()}
            </Menu>
        )
    }

    renderAccountMenu = () => {
        const { showMenu } = this.state;
        const { isMobile } = this.props.Screen;
        const { profile } = this.props.Auth;

        if (!profile)
            return (
                <MenuItem name='login' noHighlight>
                    {isMobile ? <TextMenuItem msg='login' onClick={this.handleClick} /> :
                        <Button onClick={this.handleClick}><TextButton msg='login' /></Button>
                    }
                </MenuItem>
            );
        else if (isMobile)
            return this.renderAccountMenuItems();
        else
            return (
                <MenuItem name='user' name='login' noHighlight>
                    <Popover
                        visible={showMenu}
                        content={
                            <Menu
                                selectedKey={this.state.current}
                                mode='inline'
                            >
                                {this.renderAccountMenuItems()}
                            </Menu>
                        }
                        placement='bottomRight'
                        arrowPointAtCenter
                        trigger='click'
                        onVisibleChange={this.handleVisibleChange}
                    >
                        <div
                            style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}
                            onClick={this.toggleShowMenu}
                        >
                            <Icon type='user' style={{ marginRight: 3 }} />
                            <div><TextMenuItem msg={profile.fname} noTranslate /></div>
                        </div>
                    </Popover>
                </MenuItem>
            )
    }

    renderAccountMenuItems = () => [
        <MenuItem key='booking_history' name='booking_history'><Link href='/booking_history'><TextMenuItem msg='bookingHistory' /></Link></MenuItem>,
        <MenuItem key='logout' name='logout' noHighlight><TextMenuItem msg='logout' onClick={this.handleLogout} /></MenuItem>
    ]


    toggleShowMenu = () => {
        const { showMenu } = this.setState;
        this.setState({ showMenu: !showMenu });
    }

    handleVisibleChange = (visible) => {
        this.setState({ showMenu: visible })
    }

    handleClick = () => {
        this.setState({ showMenu: false })
        this.props.showAuthModal();
    }

    handleLogout = () => {
        this.setState({ showMenu: false });
        this.props.logout();
    }

}

export default connect(
    state => state,
    { ...AuthAction, ...ModalAction },
)(withRouter(TopNavContent));