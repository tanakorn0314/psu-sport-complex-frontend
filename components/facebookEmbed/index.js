import React from 'react';

class FacebookEmbed extends React.Component {
    render() {
        return (
            <div>
                <iframe src={`https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FSports-Complex-PSU-Phuket-571700533287729%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=431603290925527`}
                    width="340"
                    height="500"
                    scrolling="no"
                    frameborder="0"
                    allowTransparency="true"
                    allow="encrypted-media"></iframe>
            </div>
        )
    }
}

export default FacebookEmbed;