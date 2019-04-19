import React from 'react';
import StyledWrapper from './style';
import moment from 'moment';
import _ from 'lodash';

class DateSlider extends React.Component {

    dateRefs = [];
    sliderRef = React.createRef();

    constructor(props) {
        super(props);
        const prevDates = _.range(0, 31).map((num) => moment().subtract(31 - num, 'd'));
        const nextDates = _.range(0, 31).map((num) => moment().add(num, 'd'));
        const initDate = [...prevDates, ...nextDates];

        this.state = {
            selectedDate: moment(),
            dateArray: initDate
        }

    }

    render() {
        const { dateArray } = this.state;
        const idx = dateArray.findIndex((date) => (moment().isSame(date, 'day') && moment().isSame(date, 'month') && moment().isSame(date, 'year')));
        this.dateRefs = dateArray.map(() => React.createRef());
        return (
            <StyledWrapper>
                <div className='arrow' onClick={this.scrollLeft}>
                    {'<'}
                </div>
                <div className='slider-container'>
                    <div className='slider' ref={this.sliderRef} onScroll={this.handleScroll}>
                        {
                            dateArray.map((date, idx) => (
                                <div className='date-box' ref={this.dateRefs[idx]}>
                                    <div className='box'>
                                        {date.format().slice(0, 10)}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='arrow' onClick={this.scrollRight}>
                    {'>'}
                </div>
            </StyledWrapper>
        )
    }

    scrollLeft = () => {
        this.sliderRef.current.scrollBy({left: -141, behavior: 'smooth'});
    }

    scrollRight = () => {
        this.sliderRef.current.scrollBy({left: 141, behavior: 'smooth'});
    }

    handleScroll = e => {
        console.log(e.nativeEvent.target);
    }
}

export default DateSlider;