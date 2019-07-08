import React from 'react';
import { Card } from 'antd';
import { H4 } from '../typo';

class ContactCard extends React.Component {
    render() {
        return (
            <Card>
                <table>
                    <tbody>
                        <tr>
                            <td><H4 msg='tel'/></td>
                            <td><H4 msg='076-219606-2'/></td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td><H4 msg='Fax'/></td>
                            <td><H4 msg='076-219606'/></td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td><H4 msg='email'/></td>
                            <td><H4 msg='sportcomplex@psu.ac.th'/></td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td><H4 msg='fanpage'/></td>
                            <td><H4 msg='PSU Sport Complex'/></td>
                        </tr>
                    </tbody>
                </table>
            </Card>
        )
    }
}

export default ContactCard;