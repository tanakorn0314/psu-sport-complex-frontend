import React from 'react';
import StyledWrapper from './style';
import moment from 'moment';

class DurationBadge extends React.Component {
    render() {
        const { startTime } = this.props;
        const endTime = moment(startTime).clone().add(30, 'minutes');
        const startHour = moment(startTime).parseZone().hour().toString().padStart(2,'0');
        const startMin = moment(startTime).parseZone().minute().toString().padStart(2,'0');
        const endHour = moment(endTime).parseZone().hour().toString().padStart(2,'0');
        const endMin = moment(endTime).parseZone().minute().toString().padStart(2,'0');
        return (
            <StyledWrapper style={this.props.style}>
                {`${startHour}:${startMin} - ${endHour}.${endMin}`}
            </StyledWrapper>
        )
    }
}

export default DurationBadge;