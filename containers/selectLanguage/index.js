import React from 'react';
import { Popover } from 'antd';
import { Menu, MenuItem } from '../../components/menu';
import { TextMenuItem } from '../../components/typo';
import text from '../../common/text';
import LangAction from '../../redux/lang/actions';
import { connect } from 'react-redux';

class SelectLanguage extends React.Component {

    state = {
        visible: false
    }

    render() {
        const { visible } = this.state;
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
                <img src={this.getShowFlags()} style={{ cursor: 'pointer' }} />
            </Popover>
        )
    }

    getShowFlags = () => {
        const { lang } = this.props;
        const enFlagUrl = "http://i65.tinypic.com/2d0kyno.png";
        const thFlagUrl = "http://i64.tinypic.com/fd60km.png";
        return lang === 'en' ? enFlagUrl : thFlagUrl;
    }

    renderFlags = () => {
        return (
            <Menu mode='inline' selectedKey='en' onChange={this.handleSelect}>
                <MenuItem name='en' style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="http://i65.tinypic.com/2d0kyno.png" style={{ marginRight: 5 }} />
                    <TextMenuItem> {text['english']}</TextMenuItem>
                </MenuItem>
                <MenuItem name='th' style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="http://i64.tinypic.com/fd60km.png" style={{ marginRight: 5 }} />
                    <TextMenuItem> {text['thai']}</TextMenuItem>
                </MenuItem>
            </Menu>
        )
    }

    handleSelect = lang => {
        console.log(lang);
        this.props.setLang(lang);
    }

}

export default connect(state => state.Lang, LangAction)(SelectLanguage);