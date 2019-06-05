import React from 'react';
import { Text, H3, H4 } from '../typo';

class BlackoutDetail extends React.Component {
    render() {
        const { start, end, title, detail } = this.props.dataSource;
        return (
            <div>
                <H3>{title}</H3>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <H4 msg='start'/>
                    <Text> : {start}</Text>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <H4 msg='end'/>
                    <Text> : {end}</Text>
                </div>
                <Text>{detail}</Text>
            </div>
        )
    }
}

export default BlackoutDetail;