import React from 'react';
import { Icon } from 'antd';
import { withNamespaces, i18n } from '../../i18n';
import moment from 'moment';
import fonts from '../../styles/fonts'
import colors from '../../styles/colors';

class ShowTime extends React.Component {
    render() {
        const { date } = this.props;
        const locale = i18n.language || 'en';
        const time = moment(date).locale(locale).format('LLL');
        return (
            <div className={this.props.className} style={{ display: 'flex', alignItems: 'center' }}>
                <Icon type="clock-circle" style={{ width: 12, marginRight: 5, color: colors.sub2 }} />
                <span style={{ fontFamily: fonts.dbChuanPim, fontSize: 16, color: colors.sub2 }}>{time}</span>
            </div>
        )
    }
}

export default withNamespaces('common')(ShowTime);