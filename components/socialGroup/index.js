import React from 'react';
import StyledWrapper, { StyledIcon, StyledIconFont } from './style';
import { Link } from '../../i18n';

const facebookUrl = `https://www.facebook.com/Sports-Complex-PSU-Phuket-571700533287729/`;
const youtubeUrl = `#`;
const mapUrl = `https://www.google.co.th/maps/place/PSU+Phuket+Sports+Complex/@7.8967948,98.3501682,17z/data=!3m1!4b1!4m5!3m4!1s0x305030354de8f3dd:0x327d72c87183a4b4!8m2!3d7.8967895!4d98.3523569?hl=th&authuser=0`;

class SocialGroup extends React.Component {
    render() {
        return (
            <StyledWrapper>
                <Link href={facebookUrl}>
                    <a className='icon-container fb' target='_blank'>
                        <StyledIconFont type="icon-facebook" />
                    </a>
                </Link>
                <Link href={youtubeUrl}>
                    <a className='icon-container youtube' target='_blank'>
                        <StyledIcon type="youtube" theme="filled" />
                    </a>
                </Link>
                <Link href={mapUrl}>
                    <a className='icon-container map' target='_blank'>
                        <StyledIcon type="pushpin" theme="filled" />
                    </a>
                </Link>
            </StyledWrapper>
        )
    }
}

export default SocialGroup;