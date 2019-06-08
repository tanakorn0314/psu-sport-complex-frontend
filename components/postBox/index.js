import React from 'react';
import StyledWrapper from './style';
import Link from '../../containers/link';

class PostBox extends React.Component {
    render() {
        const { img, title, content } = this.props;
        return (
            <StyledWrapper>
                <Link href='#'>
                    <div className='link'>
                        <img src={img} width='100%' />
                        <h3>{title}</h3>
                    </div>
                </Link>
                <p>{content}</p>
            </StyledWrapper>
        )
    }
}

export default PostBox;