import React from 'react';
import Blackout from '../../../AdminComponents/Blackout';
import ManageOperationTime from '../../../AdminComponents/ManageOperationTime';

class OperationTime extends React.Component {
    render() {
        return (
            <div style={{padding: 20}}>  
                <Blackout style={{marginBottom: 10}}/>
                <ManageOperationTime style={{marginBottom: 10}}/>
            </div>
        )
    }
}

export default OperationTime;