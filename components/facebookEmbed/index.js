import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
    min-height: 300px;

    ._2p3a {
        width: 100% !important;
    }
`

class FacebookEmbed extends React.Component {
    render() {
        return (
            <StyledWrapper>
                <iframe src={`https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FSports-Complex-PSU-Phuket-571700533287729%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=431603290925527`}
                    width="100%"
                    height="400px"
                    scrolling="no"
                    frameBorder="0"
                    allow="encrypted-media" />
            </StyledWrapper>
        )
    }
}

export default FacebookEmbed;