import React from 'react';
import Link from 'next/link';

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

const Navbar = props => {
    const { classes } = props;
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
                <Link href='/signin'>
                    <div className='menu-item'>SIGN IN</div>
                </Link>
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
            .menu-item {
                color: ${fontColor};
                cursor: pointer;
                margin-right: 1em
            }
            .menu-item:hover {
                color: ${fontColorHover};
            }
        `}</style>
        </div >
    )
};

export default Navbar