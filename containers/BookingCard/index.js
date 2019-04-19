import React from 'react';
import _ from 'lodash';
import StyledRow, {
    SlotTitle,
    Slot,
    Badge
} from './style';
import {
    Col
} from 'antd';
import { connect } from 'react-redux';
import BookingAction from '../../redux/booking/actions';

class BookingSlot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
        }
    }

    render() {
        const {
            court,
            bookingData
        } = this.props.dataSource;
        const isBooked = !!bookingData;

        return (
            <Slot seleted={this.state.selected} onClick={this.toggleSelect}>
                <SlotTitle booked={isBooked}>
                    {`Court ${court + 1}`}
                </SlotTitle>
                <div className='slot-info'>
                    {isBooked ?
                        [<>
                            Booked<br />
                            by<br />
                            {bookingData && bookingData.owner.fname}
                        </>] :
                        ['Available']
                    }
                </div>
                {this.state.selected && <Badge />}
            </Slot>
        )
    }

    toggleSelect = () => {
        const { selected } = this.state;
        const { court, start, bookingData } = this.props.dataSource;
        const isBooked = !!bookingData;
        if (isBooked)
            return;

        this.setState({ selected: !selected }, () => {
            this.props.onSelect && this.props.onSelect({
                start,
                court,
                selected: this.state.selected
            })
        })
    }
}

class BookingCard extends React.Component {
    render() {
        const {
            start,
            end,
            numCourt,
            bookingData
        } = this.props.dataSource;
        return (
            <StyledRow type='flex' align='middle'>
                <Col className='duration' s={24} md={24} lg={24} xl={12} xxl={12}>
                    <div className='start-time'>
                        {start}
                    </div>
                    <div className='line-container'>
                        <div className='line' />
                    </div>
                    <div className='end-time'>
                        {end}
                    </div>
                </Col>
                <Col className='slot-container' s={24} md={24} lg={24} xl={12} xxl={12}>
                    {
                        _.range(0, numCourt).map((num) => {
                            const data = {
                                start,
                                court: num,
                                bookingData: !bookingData ? null : bookingData[num]
                            }
                            return (
                                <BookingSlot key={num} dataSource={data} onSelect={this.handleSelect} />
                            )
                        })
                    }
                </Col>
            </StyledRow>
        )
    }

    handleSelect = async data => {
        const result = await this.props.selectBooking(data);
        console.log(result);
    }
}

export default connect(
    state => state,
    BookingAction,
)(BookingCard);