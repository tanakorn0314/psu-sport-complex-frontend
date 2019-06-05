import React from 'react';
import { H1 } from '../typo';

class CountDown extends React.Component {

    constructor(props) {
        super(props);
        const minute = props.minute ? props.minute : 20;
        const second = props.second ? props.second : 0;
        this.state = {
            minute,
            second
        }
    }

    render() {
        const { minute, second } = this.state;
        return (
            <H1>{minute} : {second.toString().padStart(2, '0')}</H1>
        );
    }

    componentWillReceiveProps(nextProps) {
        const minute = nextProps.minute ? nextProps.minute : 20;
        const second = nextProps.second ? nextProps.second : 0;
        this.setState({ minute, second });
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
                this.setState({ second, minute });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
}

export default CountDown;