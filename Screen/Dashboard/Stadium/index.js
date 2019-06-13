import React from 'react';
import CreateStadium from '../../../containers/createStadium';
import ManageStadium from '../../../containers/manageStadium';

class Stadium extends React.Component {

    render() {
        return (
            <div style={{padding: 20}}>  
                <CreateStadium style={{marginBottom: 10}}/>
                <ManageStadium style={{marginBottom: 10}}/>
            </div>
        )
    }
}

export default Stadium;