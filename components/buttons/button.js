import React from 'react';
import ButtonWrapper from './button.style';

const Button = props => (
    <ButtonWrapper className='container' onClick={props.onClick}>
        {props.children}
    </ButtonWrapper>
)

export default Button;