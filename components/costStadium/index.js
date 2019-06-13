import React from 'react';
import { Label } from '../typo';
import Input from '../input';

class CostStadium extends React.Component {
    render() {
        const { position, value, onChange } = this.props;
        return (
            <tr>
                <td style={{ paddingRight: 5 }}>
                    <Label msg={position} />
                </td>
                <td style={{ paddingRight: 5 }}>
                    <Input
                        type='number'
                        style={{ maxWidth: 100 }}
                        value={value}
                        onChange={onChange}
                    />
                </td>
                <td>
                    <Label msg='baht/hour' />
                </td>
            </tr>
        )
    }
}

export default CostStadium