import React from 'react';
import { H1 } from '../typo';
import moment from 'moment';
import PubSub from 'pubsub-js';

class CountDown extends React.Component {

    constructor(props) {
        super(props);

        const { expiresAt } = props;
        const mExpire = moment(expiresAt);
        const now = moment();
        const remainMinute = mExpire.diff(now, 'minute') % 60;
        const remainSecond = mExpire.diff(now, 'second') % 60;

        this.state = {
            minute: remainMinute,
            second: remainSecond
        }
    }

    componentWillMount() {
        this.token1 = PubSub.subscribe('setExpiresCountDown', (name, expiresAt) => {
            const mExpire = moment(expiresAt);
            const now = moment();
            const remainMinute = mExpire.diff(now, 'minute') % 60;
            const remainSecond = mExpire.diff(now, 'second') % 60;

            this.setState({
                minute: remainMinute,
                second: remainSecond
            })
        })
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.token1);
    }

    render() {
        const { minute, second } = this.state;
        let min = minute >= 0 ? minute : 0;
        let sec = minute >= 0 ? second : 0;
        return (
            <H1>{min} : {sec.toString().padStart(2, '0')}</H1>
        );
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            let { minute, second } = this.state;
            second--;
            if (second < 0) {
                minute--;
                second = 59;
            }
            if (minute < 0) {
                this.props.onTimeout && this.props.onTimeout();
                clearInterval(this.interval);
                this.interval = null;
            }
            // if (minute >=0 && second >= 0)
            this.setState({ second, minute });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
}

export default CountDown;