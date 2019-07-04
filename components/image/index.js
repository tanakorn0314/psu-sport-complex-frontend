import React from 'react';
import noImage from '../../static/image/noimage.png';

class Img extends React.Component {
    render () {
        return (
            <img {...this.props} onError={this.addDefaultSrc} />
        )
    }

    addDefaultSrc = e => {
        e.target.src = noImage
        return false;
    }
}

export default Img;