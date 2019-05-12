import React from 'react';
import { Line, HorizontalBar } from 'react-chartjs-2';
import { Card } from 'antd';
import { connect } from 'react-redux';
import _ from 'lodash';
import { colorsPool } from '../../../styles/constants/colors';
import CountUp from 'react-countup';
import moment from 'moment';
import helper from './helper';

class BookingChart extends React.Component {

    render() {
        const { displayBookings } = this.props.Admin;
        const total = displayBookings.reduce((acc, booking) => acc + booking.fee, 0);

        return (
            <Card style={this.props.style}>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                    <div style={{ width: '40%' }}>
                        {this.renderBar()}
                    </div>
                    <div style={{ width: '18%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <h1 style={{ fontSize: 36, fontWeight: 'bold' }}>Total</h1>
                        <CountUp
                            start={0}
                            end={total}
                            useEasing
                            suffix=' Baht'
                            style={{ fontSize: 32, fontWeight: 'lighter' }}
                        />
                    </div>
                    <div style={{ width: '40%' }}>
                        {this.renderLine()}
                    </div>
                </div>
            </Card >
        )
    }

    renderBar = () => {
        const { displayBookings } = this.props.Admin;
        const { stadiums } = this.props.Stadium;

        const labels = stadiums.map((stadium) => stadium.name);
        const data = helper.getSportIncome(displayBookings, stadiums);
        const borderColor = data.map((d, idx) => colorsPool[idx]);
        const backgroundColor = borderColor.map((color, idx) => color + '60');

        return (
            <HorizontalBar
                data={{
                    labels,
                    datasets: [{
                        label: 'Income',
                        data,
                        borderColor,
                        backgroundColor,
                        fill: true,

                    }]
                }}
                options={{
                    animation: {
                        duration: 1000,
                        easing: 'easeInOutExpo'
                    },
                }}
            />
        )
    }

    renderLine = () => {
        const { displayBookings, start: startDate, end: endDate } = this.props.Admin;
        let end = moment(endDate);
        let start = moment(startDate);

        let diff, data, labelStep, labelFormat;
        let dayDiff = end.diff(start, 'day') + 1;
        let monthDiff = end.diff(start, 'month') + 1;
        let yearDiff = end.diff(start, 'year') + 1;

        if (yearDiff > 1) {
            diff = yearDiff;
            data = helper.getAnnualIncome(displayBookings, start, end);
            labelStep = 'year';
            labelFormat = 'YYYY';
        } else if (monthDiff > 1) {
            diff = monthDiff;
            data = helper.getMonthlyIncome(displayBookings, start, end);
            labelStep = 'month';
            labelFormat = 'MMM';
        } else {
            if (end.diff(start, 'month') === 0 && end.diff(start, 'day') < 30) {
                start = end.clone().date(1);
                dayDiff = end.diff(start, 'day') + 1;
            }
            diff = dayDiff;
            data = helper.getDailyIncome(displayBookings, start, end);
            labelStep = 'day';
            labelFormat = 'DD';
        }

        const labels = _.range(0, diff).map((num) => start.clone().add(num, labelStep).format(labelFormat));
        const borderColor = _.range(0, diff).map(() => colorsPool[1]);
        const backgroundColor = borderColor.map((color, idx) => color + '60');

        const startFormat = `DD${end.diff(start, 'month') !== 0 ? ' MMM' : ''}${end.diff(start, 'year') !== 0 ? ', YYYY' : ''}`
        return (
            <Line
                data={{
                    labels,
                    datasets: [{
                        label: `${start.format(startFormat)} - ${end.format('DD MMM, YYYY')}`,
                        data,
                        borderColor,
                        backgroundColor,
                        fill: false,

                    }]
                }}
                options={{
                    animation: {
                        duration: 1000,
                        easing: 'easeInOutExpo'
                    },
                }}
            />
        )
    }
}

export default connect(state => state)(BookingChart);