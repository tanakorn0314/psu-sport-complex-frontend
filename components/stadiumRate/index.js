import React from 'react';
import StyledWrapper, { Content } from './style';
import RateTable from '../rateTable';
import Button from '../ghostButton';
import { H3 } from '../typo';
import { withNamespaces, Link } from '../../i18n';

import tennis from '../../static/image/stadium/tennis.jpg';
import tableTennis from '../../static/image/stadium/pingpong.jpg';
import volleyball from '../../static/image/stadium/basketball.jpg';
import badminton from '../../static/image/stadium/badminton.jpg';
import basketball from '../../static/image/stadium/basketball.jpg';
import football from '../../static/image/stadium/football.jpg';
import swimming from '../../static/image/stadium/swimming.jpg';
import fitness from '../../static/image/stadium/fitness.jpg';

class StadiumRate extends React.Component {

    render() {
        const { stadium, t } = this.props;
        const img = this.chooseImage();
        return (
            <StyledWrapper>
                <img className='image' src={img} />
                <Content>
                    <div className='left-container'>
                        <div className='sport-banner'>
                            <H3 className='title' msg={stadium.name} responsive />
                        </div>
                        {
                            stadium.canBook && (
                                <Link href={`/booking?sport=${stadium.name}`}>
                                    <Button className='btn-book' ghost >
                                        {t('bookNow')}
                                    </Button>
                                </Link>
                            )
                        }
                    </div>
                    <div className='right-container'>
                        <RateTable stadium={stadium} />
                    </div>
                </Content>
            </StyledWrapper>
        )
    }

    chooseImage() {
        const { stadium } = this.props;
        if (stadium) {
            const { name } = stadium;
            switch (name) {
                case 'tennis': return tennis;
                case 'tabletennis': return tableTennis;
                case 'volleyball': return volleyball;
                case 'badminton': return badminton;
                case 'basketball': return basketball;
                case 'swimming': return swimming;
                case 'football': return football;
                case 'fitness': return fitness;
                default: return tennis;

            }
        }
    }
}

export default withNamespaces('common')(StadiumRate);