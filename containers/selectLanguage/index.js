import React from 'react';
import { Popover } from 'antd';
import { Menu, MenuItem } from '../../components/menu';
import { TextMenuItem } from '../../components/typo';
import { withNamespaces, i18n } from '../../i18n';

import thFlag from '../../static/image/flags/th.png';
import enFlag from '../../static/image/flags/us.png';

class SelectLanguage extends React.Component {

    state = {
        visible: false
    }

    render() {
        const { visible } = this.state;
        const flag = this.getShowFlags();
        return (
            <Popover
                className={this.props.className}
                visible={visible}
                content={this.renderFlags()}
                placement='bottomRight'
                trigger='click'
                arrowPointAtCenter
                onVisibleChange={(visible) => { this.setState({ visible }) }}
            >
                <img src={flag} style={{ cursor: 'pointer' }} />
            </Popover>
        )
    }

    getShowFlags = () => {
        const lang = i18n.language;
        return lang === 'th' ? thFlag : enFlag;
    }

    renderFlags = () => {
        const { t } = this.props;
        return (
            <Menu mode='inline' selectedKey={i18n.language} onChange={this.handleSelect}>
                <MenuItem name='en' style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={enFlag} style={{ marginRight: 5 }} />
                    <TextMenuItem> {t('english')}</TextMenuItem>
                </MenuItem>
                <MenuItem name='th' style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={thFlag} style={{ marginRight: 5 }} />
                    <TextMenuItem> {t('thai')}</TextMenuItem>
                </MenuItem>
            </Menu>
        )
    }

    handleSelect = lang => {
        i18n.changeLanguage(lang);
        this.setState({visible: false})
    }

}

export default withNamespaces('common')(SelectLanguage);