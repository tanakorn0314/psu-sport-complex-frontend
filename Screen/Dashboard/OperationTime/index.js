import React from 'react';
import Blackout from '../../../containers/blackout';
import BlackoutList from '../../../containers/blackoutList';
import ManageOperationTime from '../../../containers/manageOperationTime';

class OperationTime extends React.Component {
    render() {
        return (
            <div style={{padding: 20}}>  
                <Blackout style={{marginBottom: 10}}/>
                <BlackoutList style={{marginBottom: 10}}/>
                <ManageOperationTime style={{marginBottom: 10}}/>
            </div>
        )
    }
}

export default OperationTime;