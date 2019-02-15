import React from 'react';

const InputWithLabel = props => (
    <div className='container'>
        <div>{props.label}</div>
        <input className='input' type={props.type} onChange={props.onChange}/>
        <style jsx>{`
            .container {
                display: flex;
                flex: 1;
                flex-direction: column;
            }
            .input {
                border: solid 1px black;
                border-radius: 3px;
                padding: 3px;
                margin: 5px 5px 5px 0;
            }
        `}</style>
    </div>
);

export default InputWithLabel;