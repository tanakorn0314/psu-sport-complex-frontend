import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
    position: relative;
    text-align:right;
    width:70vw;
    height: 350px;
    .gmap_canvas {
        overflow: hidden;
        background:none!important;
        width:70vw;
        height: 350px;
    }

    @media (max-width: 575px) {
        width:95vw;
        height: 300px;
        .mapouter {
            width:95vw;
            height: 300px;
        }
    }
`

class Map extends React.Component {
    render() {
        return (
            <StyledWrapper class="mapouter">
                <div class="gmap_canvas">
                    <iframe
                        width="100%"
                        height="100%"
                        id="gmap_canvas"
                        src={`https://maps.google.com/maps?q=psu%20phuket%20sport%20complex&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                        frameborder="0"
                        scrolling="no"
                        marginheight="0"
                        marginwidth="0">
                    </iframe>
                </div>
            </StyledWrapper>
        )
    }

    componentDidMount() {

    }
}

export default Map;