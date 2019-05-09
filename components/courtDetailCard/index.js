import React from 'react';
import StyledWrapper from './style';
import DurationBadge from '../durationBadge';

class CourtDetailCard extends React.Component {
    render() {
        const { court, durations } = this.props;
        return (
            <StyledWrapper style={this.props.style}>
                <div className='courtNumContainer'>
                    <div className='courtNum'>Court {court}</div>
                    <div className='durationContainer'>
                        {durations.map((duration, index) => (
                            <DurationBadge key={index} startTime={duration} style={{ marginRight: 5, marginBottom: 5 }} />)
                        )}
                    </div>
                </div>
            </StyledWrapper>
        )
    }
}

export default CourtDetailCard;