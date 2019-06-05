import React from 'react';
import { Text } from '../typo';

class Confirm extends React.Component {
    render() {    
        return (
            <Text>{this.props.msg}</Text>
        )
    }
}

export default Confirm;