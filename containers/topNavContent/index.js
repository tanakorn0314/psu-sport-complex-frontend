import React from 'react';
import { Link } from '../../i18n';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import AuthAction from '../../redux/auth/actions';
import ModalAction from '../../redux/modal/actions';
import logo from '../../static/image/psu_brand.png';
import { Menu, MenuItem } from '../../components/menu';
import { TextMenuItem, TextButton } from '../../components/typo';
import { StyledPopover as Popover, A } from './style';
import {
    Row,
    Col,
    Icon
} from 'antd';
import Button from '../../components/button';
import ChangeLanguage from '../../components/changeLanguage';
import { i18n, withNamespaces } from '../../i18n';

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
        const { t } = this.props;
        const { isMobile } = this.props.Screen;
        const { user } = this.props.Auth;

        const menuMode = isMobile ? 'inline' : 'horizontal';

        const switchLangButton = <MenuItem onClick={this.switchLang}><ChangeLanguage changeByParent /></MenuItem>
        const dashboardButton = (
            <MenuItem name='dashboard'>
                <Link href='/dashboard/bill'>
                    <A>{t('admin')}</A>
                </Link>
            </MenuItem>
        )
        const bookingButton = (
            <MenuItem name='booking'>
                <Link href='/booking'>
                    <A>{t('booking')}</A>
                </Link>
            </MenuItem>
        )

        return (
            <Menu selectedKey={this.state.current} mode={menuMode}>
                {!isMobile && switchLangButton}
                {user && user.position === 'admin' && dashboardButton}
                {bookingButton}
                {!user && isMobile && switchLangButton}
                {this.renderAccountMenu()}
            </Menu>
        )
    }

    renderAccountMenu = () => {
        const { showMenu } = this.state;
        const { isMobile } = this.props.Screen;
        const { user } = this.props.Auth;

        const loginText = <TextMenuItem msg='login' onClick={this.handleClick} />
        const loginButton = <Button onClick={this.handleClick}><TextButton msg='login' /></Button>

        if (!user)
            return (
                <MenuItem name='login' noHighlight>
                    {isMobile ? loginText : loginButton}
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
                            <div><TextMenuItem msg={user.fname} noTranslate /></div>
                        </div>
                    </Popover>
                </MenuItem>
            )
    }

    renderAccountMenuItems = () => {
        const { t, Screen } = this.props;
        return [
            <MenuItem key='booking_history' name='booking_history'><Link href='/booking_history'><A>{t('bookingHistory')}</A></Link></MenuItem>,
            <MenuItem key='account' name='account'><Link href='/account'><A>{t('account')}</A></Link></MenuItem>,
            Screen.isMobile && <MenuItem key='changeLang' onClick={this.switchLang}><ChangeLanguage changeByParent /></MenuItem>,
            <MenuItem key='logout' name='logout' noHighlight><TextMenuItem msg='logout' onClick={this.handleLogout} /></MenuItem>
        ]
    }


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

    switchLang = () => {
        const locale = i18n.language;
        const nextLanguage = locale === 'en' ? 'th' : 'en';
        i18n.changeLanguage(nextLanguage);
        this.setState({ showMenu: false });
    }
}

const Translated = withNamespaces('common')(TopNavContent)

export default connect(
    state => state,
    { ...AuthAction, ...ModalAction },
)(withRouter(Translated));