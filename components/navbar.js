import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { storeUser } from '../../action/auth-action';

const appName = 'PSU Sport Complex';
const menus = [
    'home',
    'about',
    'services',
    'book online',
    'contact'
];

const primaryColor = '#FFF';
const fontColor = '#616161';
const fontColorHover = '#DBDB00';

const SignIn = () => (
    <Link href='/signin'>
        <div className='menu-item'>SIGN IN</div>
    </Link>
);

const SignOut = props => (
    <div className='menu-item' onClick={props.onClick}>SIGN OUT</div>
)

class Navbar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { user } = this.props;
        return (
            <div className='root'>
                <div className='menu-container'>
                    {menus.map((item, index) => {
                        const url = item !== `book online` ? `/#${item}` : `/${item.replace(' ', '_')}`;
                        return (
                            <Link href={url} key={index}>
                                <div className='menu-item'>{item.toUpperCase()}</div>
                            </Link>
                        )
                    })}
                </div>
                <div className='right-menu-container'>
                    {!user.username ? <SignIn/> : <SignOut onClick={this.clearUser}/>}
                </div>
                <style jsx>{`
            :global(body) {
                margin: 0;
                font-family: Roboto
            }
            .root {
                display: flex;
                flex-direction: row;
                flex: 1;
                background-color: ${primaryColor};
                padding: 20px 10px 20px 10px;
                position: fixed;
                top: 0;
                left: 0;
                z-index: 100;
                width: 100%;
            }
            .menu-container {
                display: flex;
                flex-direction: row;
                flex: 1;
                justify-content: space-between;
                padding: 0 20vw 0 20vw
            }
            .right-menu-container {
                margin-left: 10px
            }
            :global(.menu-item) {
                color: ${fontColor};
                cursor: pointer;
                margin-right: 1em
            }
            :global(.menu-item:hover) {
                color: ${fontColorHover};
            }
        `}</style>
            </div >
        )
    };

    clearUser = () => {
        document.cookie = `accessToken=''`;
        this.props.clearUser();
    }
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    clearUser: () => {
        dispatch(storeUser(''));
    },
    initUser: (token) => {
        dispatch(storeUser(token));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)