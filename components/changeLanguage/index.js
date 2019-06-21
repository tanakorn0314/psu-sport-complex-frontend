import React from 'react';
import StyledWrapper, { LangLabel } from './style';
import { withNamespaces, i18n } from '../../i18n';

class ChangeLanguage extends React.Component {
    render() {
        const locale = i18n.language || 'en';
        return (
            <StyledWrapper onClick={this.switchLanguage} ref={this.props.ref}>
                <LangLabel active={locale === 'th'}>TH</LangLabel>
                <span>|</span>
                <LangLabel active={locale === 'en'}>EN</LangLabel>
            </StyledWrapper>
        )
    }

    switchLanguage = () => {
        const { changeByParent } = this.props;
        if (!changeByParent) {
            const locale = i18n.language;
            const nextLanguage = locale === 'en' ? 'th' : 'en';
            i18n.changeLanguage(nextLanguage)
        }
    }
}

export default withNamespaces('common')(ChangeLanguage);