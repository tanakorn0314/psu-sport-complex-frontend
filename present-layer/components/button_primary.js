import React from 'react';

const ButtonPrimary = props => (
    <div className='container' onClick={props.onClick}>
        <span className='content'>{props.children}</span>
        <style jsx>{`
            .container {
                background-color: ${props.backgroundColor || `blue`};
                padding: 6px 12px 6px 12px;
                border-radius: 3px;
                cursor: pointer;
            }
            .content {
                color: ${props.color || `#fff`}
            }
        `}</style>
    </div>
);

export default ButtonPrimary;