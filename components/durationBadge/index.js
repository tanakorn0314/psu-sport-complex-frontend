import React from 'react';
import StyledWrapper from './style';

class DurationBadge extends React.Component {
    render() {
        return (
            <StyledWrapper style={this.props.style}>
                15.00 - 15.30
            </StyledWrapper>
        )
    }
}

export default DurationBadge;