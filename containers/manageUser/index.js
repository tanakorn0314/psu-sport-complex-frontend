import React from 'react';
import { Tabs } from 'antd';
import { Label, H4, Text } from '../../components/typo';
import { withNamespaces } from '../../i18n';
import ManageMember from '../manageMember';
import ManageAdmin from '../manageAdmin';

const { TabPane } = Tabs;

class ManageUser extends React.Component {

    constructor(props) {
        super(props);

        const current = this.requireShowMemberPanel() ? 'member' : 'admin';

        this.state = {
            current
        }
    }

    componentWillReceiveProps(nextProps) {
        const current = this.requireShowMemberPanel(nextProps) ? 'member' : 'admin';

        this.setState({ current })
    }

    render() {
        const { user, t } = this.props;
        const showMemberPanel = this.requireShowMemberPanel();

        const { fname, lname, email, position, phoneNumber, psuPassport } = user;

        const info = psuPassport.length > 0 ? psuPassport : phoneNumber;
        const text = psuPassport.length > 0 ? t('PSU Passport') : t('phoneNo');

        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td><H4 style={{ marginRight: 5 }}>{t('name')} </H4></td>
                            <td>:</td>
                            <td><Label >{`${fname} ${lname}`}</Label></td>
                        </tr>
                        <tr>
                            <td><H4 style={{ marginRight: 5 }}>{text} </H4></td>
                             <td>:</td>
                            <td><Label >{`${info}`}</Label></td>
                        </tr>
                        <tr>
                            <td><H4 style={{ marginRight: 5 }}>{t('email')} </H4></td>
                             <td>:</td>
                            <td><Label >{email}</Label></td>
                        </tr>
                        <tr>
                            <td><H4 style={{ marginRight: 5 }}>{t('position')} </H4></td>
                             <td>:</td>
                            <td><Label >{position}</Label></td>
                        </tr>
                    </tbody>
                </table>
                <Tabs activeKey={this.state.current} onChange={this.handleChange}>
                    {
                        showMemberPanel && (
                            <TabPane tab={<Label msg='member' />} key='member'>
                                <ManageMember user={user} />
                            </TabPane>
                        )
                    }
                    <TabPane tab={<Label msg='admin' />} key='admin'>
                        <ManageAdmin user={user} />
                    </TabPane>
                </Tabs>
            </div>
        )
    }

    requireShowMemberPanel(props = this.props) {
        const { user } = props;
        return user.position === 'generalPublic' || user.position === 'member';
    }

    handleChange = (current) => {
        this.setState({ current });
    }

}

export default withNamespaces('common')(ManageUser);