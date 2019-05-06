import React from 'react';
import StyledWrapper from './style';
import DurationBadge from '../durationBadge';

class CourtDetailCard extends React.Component {
    render() {
        return (
            <StyledWrapper style={this.props.style}>
                <div className='courtNumContainer'>
                    <div className='courtNum'>Court 1</div>
                    <div className='durationContainer'>
                        <DurationBadge style={{marginRight: 5, marginBottom: 5}}/>
                        <DurationBadge style={{marginRight: 5, marginBottom: 5}}/>
                        <DurationBadge style={{marginRight: 5, marginBottom: 5}}/>
                        <DurationBadge style={{marginRight: 5, marginBottom: 5}}/>
                        <DurationBadge style={{marginRight: 5, marginBottom: 5}}/>
                        <DurationBadge style={{marginRight: 5, marginBottom: 5}}/>
                        <DurationBadge style={{marginRight: 5, marginBottom: 5}}/>
                        <DurationBadge style={{marginRight: 5, marginBottom: 5}}/>
                        <DurationBadge style={{marginRight: 5, marginBottom: 5}}/>
                        <DurationBadge style={{marginRight: 5, marginBottom: 5}}/>
                        <DurationBadge style={{marginRight: 5, marginBottom: 5}}/>
                        <DurationBadge style={{marginRight: 5, marginBottom: 5}}/>
                        <DurationBadge style={{marginRight: 5, marginBottom: 5}}/>
                        <DurationBadge style={{marginRight: 5, marginBottom: 5}}/>
                        <DurationBadge style={{marginRight: 5, marginBottom: 5}}/>
                        <DurationBadge style={{marginRight: 5, marginBottom: 5}}/>
                        <DurationBadge style={{marginRight: 5, marginBottom: 5}}/>
                    </div>
                </div>
            </StyledWrapper>
        )
    }
}

export default CourtDetailCard;