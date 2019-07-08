import React from 'react';
import StyledWrapper from './style';
import { PageTitle } from '../typo';
import img from '../../static/image/stadium/swimming-pool.jpg';

class SectionParallex extends React.Component {
    render() {
        return (
            <StyledWrapper>
                <div class="background">
                    <img class="background__image" src={img} />
                </div>
                <div class="foreground">
                    <div class="foreground__content">
                        <PageTitle style={{ margin: 0, padding: 32 }}>
                            Choose Your Favourite Sport
                        </PageTitle>
                    </div>
                </div>
            </StyledWrapper>
        )
    }
}

export default SectionParallex