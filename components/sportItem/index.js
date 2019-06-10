import React from 'react';
import StyledWrapper from './style';
import tennis from '../../static/image/icons/tennis.png';
import tennisHover from '../../static/image/icons/tennisHover.png';
import badminton from '../../static/image/icons/badminton.png';
import badmintonHover from '../../static/image/icons/badmintonHover.png';
import pingpong from '../../static/image/icons/pingpong.png';
import pingpongHover from '../../static/image/icons/pingpongHover.png';
import basketball from '../../static/image/icons/basketball.png';
import basketballHover from '../../static/image/icons/basketballHover.png';
import volleyball from '../../static/image/icons/volleyball.png';
import volleyballHover from '../../static/image/icons/volleyballHover.png';
import soccer from '../../static/image/icons/soccer.png';
import soccerHover from '../../static/image/icons/soccerHover.png';
import swimming from '../../static/image/icons/swimming.png';
import swimmingHover from '../../static/image/icons/swimmingHover.png';
import { Label } from '../typo';

class SportItem extends React.Component {

    constructor(props) {
        super(props);

        const { img, imgHover } = this.chooseImage();

        this.img = img;
        this.imgHover = imgHover;

        this.state = { hover: false }
    }

    render() {
        const { img, imgHover } = this;
        const { hover } = this.state;
        const { id, sport, selected, mode } = this.props;

        const hightLight = selected || hover;
        const curImage = hightLight ? imgHover : img;

        return (
            <StyledWrapper
                id={id}
                selected={hightLight}
                mode={mode}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
                onClick={this.handleClick}
            >
                <img className='img' src={curImage}/>
                <Label className='label' msg={sport}/>
            </StyledWrapper>
        )
    }

    handleClick = (e) => {
        this.props.onClick && this.props.onClick(this.props.id);
    }

    handleMouseOver = () => {
        this.setState({ hover: true })
    }

    handleMouseOut = () => {
        this.setState({ hover: false })
    }

    chooseImage = () => {
        const { sport } = this.props;
        switch (sport) {
            case 'tennis': return { img: tennis, imgHover: tennisHover };
            case 'tabletennis': return { img: pingpong, imgHover: pingpongHover };
            case 'volleyball': return { img: volleyball, imgHover: volleyballHover };
            case 'badminton': return { img: badminton, imgHover: badmintonHover };
            case 'basketball': return { img: basketball, imgHover: basketballHover };
            case 'swimming': return { img: swimming, imgHover: swimmingHover };
            case 'football': return { img: soccer, imgHover: soccerHover };
            default: return { img: tennis, imgHover: tennisHover }
        }
    }
}

export default SportItem;