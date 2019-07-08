import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
    position: relative;
    text-align:right;

    .gmap_canvas {
        overflow: hidden;
        background:none!important;
    }
    
`

class Map extends React.Component {
    render() {
        return (
            <StyledWrapper className="mapouter">
                <div className="gmap_canvas">
                    <iframe
                        width="100%"
                        height="100%"
                        id="gmap_canvas"
                        src={`https://maps.google.com/maps?q=psu%20phuket%20sport%20complex&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                        frameBorder="0"
                        scrolling="no"
                        marginWidth="0"
                        marginHeight="0">
                    </iframe>
                </div>
            </StyledWrapper>
        )
    }

    componentDidMount() {

    }
}

export default Map;