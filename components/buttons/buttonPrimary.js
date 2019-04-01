import React from 'react';
import ButtonWrapper from './buttonPrimary.style';

const ButtonPrimary = props => (
    <ButtonWrapper onClick={props.onClick}>
        <span className='content'>{props.children}</span>
    </ButtonWrapper>
);

export default ButtonPrimary;