import React from 'react';
import StyledWrapper from './style';
import Button from '../uielements/button';
import Link from 'next/link';

class BillCard extends React.Component {
    render() {
        const {
            billId,
            bookingTime,
            balance,
            sport
        } = this.props.dataSource;
        return (
            <StyledWrapper style={this.props.style}>
                <div className='row'>
                    <div className='lCol'>
                        Booking Time : {bookingTime}
                    </div>
                    <div className='rCol'>
                        {balance} Baht
                    </div>
                </div>
                <div className='row'>
                    <div className='lCol'>
                        Sport : {sport.charAt(0).toUpperCase() + sport.slice(1)}
                    </div>
                    <div className='rCol'>
                        <Link href={`/booking_detail?billId=${billId}`}>
                            <Button type='primary'>Detail</Button>
                        </Link>
                    </div>
                </div>
            </StyledWrapper>
        )
    }
}

export default BillCard;