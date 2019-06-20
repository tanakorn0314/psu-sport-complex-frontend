import React from 'react';
import StyledWrapper, { EditableText } from './style';
import { PageTitle, H3, Label } from '../../components/typo';
import { Card, Button, Spin } from 'antd';
import { withNamespaces, i18n, Router } from '../../i18n';
import { connect } from 'react-redux';
import moment from 'moment';

const Row = (props) => {
    const { title, children } = props;
    return (
        <tr onClick={props.onClick}>
            <td>
                <H3>{title}</H3>
            </td>
            <td className='td-content'>
                {children}
            </td>
        </tr>
    )
}

class Account extends React.Component {

    render() {
        const { t } = this.props;
        const { profile } = this.props.Auth;

        const { fname, lname, phoneNumber, psuPassport, email, position } = profile;

        const inPSU = psuPassport.length > 0;
        const infoLabel = inPSU ? 'PSU Passport' : 'phoneNumber';
        const info = inPSU ? psuPassport : phoneNumber;

        return (
            <StyledWrapper>
                <div className='title'><PageTitle msg='account' /></div>
                <table style={{ width: '100%' }}>
                    <tbody>
                        <Row title={t(infoLabel)} onClick={() => {Router.replace('/booking')}}>
                            <Label>{info}</Label>
                        </Row>
                        <Row title={t('email')}>
                            <EditableText editable>{email}</EditableText>
                        </Row>
                        <Row title={t('firstname')}>
                            <EditableText editable>{fname}</EditableText>
                        </Row>
                        <Row title={t('lastname')}>
                            <EditableText editable>{lname}</EditableText>
                        </Row>
                        <Row title={t('type')}>
                            <Label>{position}</Label>
                        </Row>
                        <Row title={t('memberExpires')}>
                            {this.renderExpiresMember()}
                        </Row>
                    </tbody>
                </table>
            </StyledWrapper>
        )
    }

    renderExpiresMember = () => {
        const { t } = this.props;
        const locale = i18n.language || 'en';
        const { profile } = this.props.Auth;

        const position = profile.position || '';

        if (position === 'generalPublic')
            return <Button>{t('upgrade to member')}</Button>
        if (position === 'member') {
            const endText = moment(profile.memberEnd).locale(locale).format('DD MMM YYYY HH:mm');
            return <Label>{endText}</Label>
        }
        return <Label>-</Label>
    }
}

export default connect(state => state)(withNamespaces('common')(Account));