import React from 'react';

class CountDown extends React.Component {

    constructor(props) {
        super(props);
        const minute = props.minute ? props.minute : 20;
        const second = props.second ? props.second : 0;
        this.state = {
            interval: null,
            minute,
            second
        }
    }

    render() {
        const { minute, second } = this.state;
        return (
            <h1>{minute} : {second.toString().padStart(2, '0')}</h1>
        );
    }

    componentWillReceiveProps(nextProps) {
        const minute = nextProps.minute ? nextProps.minute : 20;
        const second = nextProps.second ? nextProps.second : 0;
        this.setState({ minute, second });
    }

    componentDidMount() {
        const interval = setInterval(() => {
            let { minute, second } = this.state;
                second--;
                if (second < 0) {
                    minute--;
                    second = 59;
                }
                if (minute < 0) {
                    this.props.onTimeout && this.props.onTimeout();
                    clearInterval(interval);
                    interval = null;
                }
                this.setState({ second, minute });
        }, 1000);

        this.setState({interval});
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }
}

export default CountDown;