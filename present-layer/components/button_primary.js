import React from 'react';
import { colors } from '../styles/constants/colors';

const ButtonPrimary = props => (
    <div className='container' onClick={props.onClick}>
        <span className='content'>{props.children}</span>
        <style jsx>{`
            .container {
                background-color: ${props.backgroundColor || colors.lightBlue};
                padding: 10px 12px;
                border-radius: 10px;
                text-align: center;
                cursor: pointer;
                min-width: 60px;
                max-width: 100px;
                margin: 10px;
                transition: background-color .2s ease-in-out;
            }
            .container:hover {
                background-color: ${colors.accent}
            }
            .content {
                color: ${props.color || `#fff`}
            }
        `}</style>
    </div>
);

export default ButtonPrimary;